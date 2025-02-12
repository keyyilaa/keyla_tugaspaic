const User = require("../models/userModel");

// GET: Menampilkan semua user
exports.index = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ status: true, data: users, method: req.method, url: req.url });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// POST: Menambahkan user baru
exports.store = async (req, res) => {
  try {
    const { id, nama, email } = req.body;
    const user = new User({ id, nama, email });
    await user.save();
    res.json({ status: true, data: user, message: "User berhasil ditambahkan!" });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

// PUT: Mengupdate user berdasarkan ID
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, email } = req.body;
    const user = await User.findOneAndUpdate({ id }, { nama, email }, { new: true });
    if (!user) return res.status(404).json({ status: false, message: "User tidak ditemukan!" });
    res.json({ status: true, data: user, message: "User berhasil diperbarui!" });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

// DELETE: Menghapus user berdasarkan ID
exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOneAndDelete({ id });
    if (!user) return res.status(404).json({ status: false, message: "User tidak ditemukan!" });
    res.json({ status: true, message: "User berhasil dihapus!" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


