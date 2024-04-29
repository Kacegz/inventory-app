const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TeaTypeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});
TeaTypeSchema.virtual("url").get(function () {
  return `/type/${this.id}`;
});

module.exports = mongoose.model("TeaType", TeaTypeSchema);
