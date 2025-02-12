const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const orderController = require("../controllers/orderController");

// Routes untuk User
router.get("/users", userController.index);
router.post("/users", userController.store);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.destroy);

// Routes untuk Product (Tambahan field kategori)
router.get("/products", productController.index);
router.post("/products", productController.store);  // Menambahkan kategori
router.put("/products/:id", productController.update); // Update kategori juga
router.delete("/products/:id", productController.destroy);

// Routes untuk Order (Tambahan field status)
router.get("/orders", orderController.index);
router.post("/orders", orderController.store);  // Menambahkan status
router.put("/orders/:id", orderController.update); // Update status juga
router.delete("/orders/:id", orderController.destroy);

module.exports = router;