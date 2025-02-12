const Product = require("../models/productModel"); // Pastikan path model sesuai

// GET: Menampilkan semua produk
exports.index = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ status: true, data: products, method: req.method, url: req.url });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// POST: Menambahkan produk baru
exports.store = async (req, res) => {
  try {
    const { nama, harga, stok, kategori } = req.body;

    // Validasi input
    if (!nama || !harga || !stok || !kategori) {
      return res.status(400).json({ status: false, message: "Semua field harus diisi!" });
    }

    const product = new Product({ nama, harga, stok, kategori });
    await product.save();
    res.json({ status: true, data: product, message: "Produk berhasil ditambahkan!" });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

// PUT: Mengupdate produk berdasarkan ID
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, harga, stok, kategori } = req.body;

    // Validasi input
    if (!nama || !harga || !stok || !kategori) {
      return res.status(400).json({ status: false, message: "Semua field harus diisi!" });
    }

    const product = await Product.findByIdAndUpdate(id, { nama, harga, stok, kategori }, { new: true });

    if (!product) return res.status(404).json({ status: false, message: "Produk tidak ditemukan!" });

    res.json({ status: true, data: product, message: "Produk berhasil diperbarui!" });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

// DELETE: Menghapus produk berdasarkan ID
exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) return res.status(404).json({ status: false, message: "Produk tidak ditemukan!" });

    res.json({ status: true, message: "Produk berhasil dihapus!" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};