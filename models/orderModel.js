const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  jumlah: { type: Number, required: true },
  status: { type: String, default: "pending" },
  payment_method: { type: String, default: "cash" } // Tambahan kolom baru
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
