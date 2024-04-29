const teaType = require("../models/teaType");
const asyncHandler = require("express-async-handler");

exports.teatype_list = asyncHandler(async (req, res) => {
  const alltypes = await teaType.find().sort({ name: 1 }).exec();
  res.render("teatype_list", {
    title: "Tea type list:",
    teatype_list: alltypes,
  });
});
exports.teatype_detail = asyncHandler(async (req, res) => {
  res.send(`not implemented: tea type detail ${req.params.id}`);
});
exports.teatype_create_get = asyncHandler(async (req, res) => {
  res.send("not implemented: tea type create get");
});
exports.teatype_create_post = asyncHandler(async (req, res) => {
  res.send("not implemented: tea type create post");
});
exports.teatype_delete_get = asyncHandler(async (req, res) => {
  res.send("not implemented: tea type delete get");
});
exports.teatype_delete_post = asyncHandler(async (req, res) => {
  res.send("not implemented: tea type delete post");
});
exports.teatype_update_get = asyncHandler(async (req, res) => {
  res.send("not implemented: tea type update get");
});
exports.teatype_update_post = asyncHandler(async (req, res) => {
  res.send("not implemented: tea type update post");
});
