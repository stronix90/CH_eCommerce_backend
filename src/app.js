const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const productosRoutes = require("./routes/productos.routes");
const carritoRoutes = require("./routes/carrito.routes");

// Inicio aplicación
const app = express();

// Settings
const port = process.env.PORT || 8080;
app.set("port", port);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("tiny"));

// Routes
app.use("/api/productos", productosRoutes);
app.use("/api/carrito", carritoRoutes);
app.use("*", function (req, res) {
  res.status(404).json({
    error: -2,
    descripcion: `El recurso [${req.method}] ${req.originalUrl} no está implementado`,
  });
});

module.exports = app
