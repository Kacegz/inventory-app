const Tea = require("../models/tea");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res) => {
  res.send("Not implemented yet");
});
exports.tea_list = asyncHandler(async (req, res) => {
  res.send("Not implemented: tea list");
});
exports.tea_detail = asyncHandler(async (req, res) => {
  res.send(`not implemented: tea detail ${req.params.id}`);
});
exports.tea_create_get = asyncHandler(async (req, res) => {
  res.send("not impelemented: tea create get");
});
exports.tea_create_post = asyncHandler(async (req, res) => {
  res.send("not impelemented: tea create post");
});
exports.tea_delete_get = asyncHandler(async (req, res) => {
  res.send("not impelemented: tea delete get");
});
exports.tea_delete_post = asyncHandler(async (req, res) => {
  res.send("not impelemented: tea delete post");
});
exports.tea_update_get = asyncHandler(async (req, res) => {
  res.send("not impelemented: tea create get");
});
exports.tea_update_post = asyncHandler(async (req, res) => {
  res.send("not impelemented: tea update post");
});
