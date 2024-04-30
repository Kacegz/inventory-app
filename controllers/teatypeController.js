const Type = require("../models/teaType");
const Tea = require("../models/tea");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.teatype_list = asyncHandler(async (req, res) => {
  const alltypes = await Type.find().sort({ name: 1 }).exec();
  res.render("teatype_list", {
    title: "Tea type list:",
    types: alltypes,
  });
});
exports.teatype_detail = asyncHandler(async (req, res, next) => {
  const [type, teasInType] = await Promise.all([
    Type.findById(req.params.id).exec(),
    Tea.find({ category: req.params.id }).exec(),
  ]);
  if (type == null) {
    const err = new Error("Type not found");
    err.status = 404;
    return next(err);
  }
  res.render("teatype_detail", {
    title: "Type details",
    type: type,
    teas: teasInType,
  });
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
