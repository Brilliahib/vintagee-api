const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Disconnect Prisma client when done
const disconnectPrisma = async () => {
  await prisma.$disconnect();
};

const createUser = async (data) => {
  try {
    const result = await prisma.user.create({
      data: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone ?? null,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserById = async (userId) => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        image_url: true,
        created_at: true,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getProductUser = async (userId) => {
  try {
    const result = await prisma.product.findMany({
      where: {
        user_id: userId,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUser = async (userId) => {
  try {
    const result = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUser = async (userId, { data }) => {
  try {
    const result = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        username: data.username,
        phone: data.phone,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

// For Admin Roles
const getAllUsers = async (search = "", page = 1, limit = 12) => {
  try {
    const skip = (page - 1) * limit;

    const result = await prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            username: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        phone: true,
        role: true,
        created_at: true,
        updated_at: true,
      },
      skip,
      take: limit,
    });

    const totalCount = await prisma.user.count({
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            username: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    return {
      data: result,
      totalCount,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  disconnectPrisma,
  createUser,
  getUserByEmail,
  getUserById,
  deleteUser,
  updateUser,
  getAllUsers,
  getProductUser,
};
