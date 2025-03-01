const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userService = require("../../services/user/user-service");
const {
  validateLogin,
  validateRegister,
} = require("../../validation/auth/auth-validation");

const handleServerError = (res, error, message = "Internal Server Error") => {
  console.error(`Error: ${error}`);
  res.status(500).json({ statusCode: 500, error: message });
};

const withoutPasswordHandler = (user) => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

const generateToken = (payload) =>
  jwt.sign(
    {
      id: payload.id,
      email: payload.email,
      role: payload.role,
      name: payload.name,
      phone: payload.phone,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

const registerUser = async (req, res) => {
  try {
    const { error, value } = validateRegister(req.body);
    if (error) {
      const errorMessage = `${error}`;
      return res.status(400).json({ statusCode: 400, error: errorMessage });
    }

    const existingUser = await userService.getUserByEmail(value.email);
    if (existingUser) {
      return res
        .status(400)
        .json({ statusCode: 400, error: "Email is already registered" });
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(value.password, salt);

    const newUser = await userService.createUser({
      name: value.name,
      email: value.email,
      password: hashedPassword,
      phone: value.phone,
      role: "user",
    });

    const token = generateToken(newUser);

    return res.status(201).json({
      statusCode: 201,
      message: "Registration user successfully",
      data: withoutPasswordHandler(newUser),
      token,
    });
  } catch (error) {
    return handleServerError(res, error, "Error registering user");
  }
};

const loginUser = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) {
      const errorMessage = `${error}`;
      return res.status(400).json({ statusCode: 400, error: errorMessage });
    }

    const { email, password } = req.body;

    const user = await userService.getUserByEmail(email);

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.setHeader("Authorization", `Bearer ${token}`);
      return res.status(200).json({
        id: user.id,
        token,
      });
    }

    if (!user) {
      return res.status(404).json({ statusCode: 404, error: "User not found" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res
        .status(401)
        .json({ statusCode: 401, error: "Invalid password" });
    }

    return res
      .status(500)
      .json({ statusCode: 500, error: "Internal Server Error" });
  } catch (error) {
    return handleServerError(res, error, "Error logging in");
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const { name, email, password, username, phone } = req.body;

    const { error } = validateRegister(req.body);
    if (error) {
      const errorMessage = `${error}`;
      return res.status(400).json({ statusCode: 400, error: errorMessage });
    }

    const existingUserWithEmail = await userService.getUserByEmail(email);
    if (existingUserWithEmail && existingUserWithEmail.user_id !== userId) {
      return res.status(400).json({
        statusCode: 400,
        error: "Email is already registered by another user",
      });
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const updatedUser = await userService.updateUser(userId, {
      name,
      email,
      password: hashedPassword,
      username,
      phone,
    });

    if (!updatedUser) {
      console.error("User not found or update failed");
      return res
        .status(404)
        .json({ statusCode: 404, error: "User not found or update failed" });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "User updated successfully",
      data: excludePassword(updatedUser),
    });
  } catch (error) {
    return handleServerError(res, error, "Error updating user");
  }
};

const getAuthUser = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ statusCode: 401, error: "Unauthorized" });
    }

    return res.status(200).json(withoutPasswordHandler(user));
  } catch (error) {
    return handleServerError(res, error, "Error fetching user");
  }
};

module.exports = {
  loginUser,
  registerUser,
  updateUser,
  getAuthUser,
  withoutPasswordHandler,
};
