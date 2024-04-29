const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TeaSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "types", required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

TeaSchema.virtual("url").get(function () {
  return `/teas/${this.id}`;
});

module.exports = mongoose.model("Tea", TeaSchema);
