const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth/auth-routes");
const categoryProductRoutes = require("./routes/category-product/category-product-route");
const productRoutes = require("./routes/product/product-routes");

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/category-product", categoryProductRoutes);
app.use("/api/product", productRoutes);

app.listen(PORT, () => {
  console.log("Express running in port" + PORT);
});
