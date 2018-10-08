const express = require("express");
const app = express();

const productRoutes = require("./routes/products");
const geoRoutes = require("./routes/geo");

app.use("/products", productRoutes);

app.use("/api/geo", geoRoutes);

module.exports = app;