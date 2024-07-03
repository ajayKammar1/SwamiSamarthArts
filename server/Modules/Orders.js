const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  name: { type: String, required: true },
  contactNo: { type: String, required: true },
  additionalDetails: { type: String, required: true },
  imageUrl: { type: String, required: true },
  billNo: { type: String, required: true },
  ganpatiModule: { type: String, required: true },
  price: { type: String, required: true },
  advance: { type: String, required: true },
  balance: { type: String, required: true },
  room: { type: String, required: true },
});

module.exports = mongoose.model("Order", OrderSchema);
