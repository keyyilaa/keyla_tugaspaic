const Order = require("../models/orderModel");

// GET: Menampilkan semua pesanan
exports.index = async (req, res) => {
  try {
    const orders = await Order.find().populate("product_id");
    res.json({ status: true, data: orders, method: req.method, url: req.url });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// POST: Menambahkan pesanan baru
exports.store = async (req, res) => {
  try {
    const { product_id, jumlah, status, payment_method } = req.body; // Tambahkan payment_method
    const order = new Order({ 
      product_id, 
      jumlah, 
      status: status || "pending", 
      payment_method: payment_method || "cash" // Default payment_method ke "cash"
    }); 
    await order.save();
    res.json({ status: true, data: order, message: "Pesanan berhasil dibuat!" });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

// PUT: Mengupdate pesanan berdasarkan ID
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id, jumlah, status, payment_method } = req.body; // Tambahkan payment_method
    const order = await Order.findByIdAndUpdate(id, { product_id, jumlah, status, payment_method }, { new: true });
    if (!order) return res.status(404).json({ status: false, message: "Pesanan tidak ditemukan!" });
    res.json({ status: true, data: order, message: "Pesanan berhasil diperbarui!" });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

// DELETE: Menghapus pesanan berdasarkan ID
exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) return res.status(404).json({ status: false, message: "Pesanan tidak ditemukan!" });
    res.json({ status: true, message: "Pesanan berhasil dihapus!" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};