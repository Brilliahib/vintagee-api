const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth/auth-routes");
const categoryProductRoutes = require("./routes/category-product/category-product-route");
const productRoutes = require("./routes/product/product-routes");
const userRoutes = require("./routes/user/user-route");
const exchangeRoutes = require("./routes/exchange/exchange-route");
const orderRoutes = require("./routes/order/order-route");

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/category-product", categoryProductRoutes);
app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/exchange", exchangeRoutes);
app.use("/api/order", orderRoutes);

app.listen(PORT, () => {
  console.log("Express running in port" + PORT);
});
