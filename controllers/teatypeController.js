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
  res.render("teatype_form", {
    title: "Add a new tea type",
  });
});
exports.teatype_create_post = [
  body("name", "Name must contain at least 3 letters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("description", "Description must not be empty")
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const type = new Type({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.render("teatype_form", {
        title: "Add a new tea type",
        type: type,
        errors: errors.array(),
      });
    } else {
      await type.save();
      res.redirect(type.url);
    }
  }),
];
exports.teatype_delete_get = asyncHandler(async (req, res) => {
  const [type, teas] = await Promise.all([
    Type.findById(req.params.id).exec(),
    Tea.find({ category: req.params.id }, "name").exec(),
  ]);
  if (type === null) {
    redirect("/types");
  }
  res.render("teatype_delete", {
    title: "Delete type",
    type: type,
    teas: teas,
  });
});
exports.teatype_delete_post = asyncHandler(async (req, res) => {
  await Tea.deleteMany({ category: req.body.typeid }).exec();
  await Type.findByIdAndDelete(req.body.typeid).exec();
  res.redirect("/types");
});
exports.teatype_update_get = asyncHandler(async (req, res) => {
  const type = await Type.findById(req.params.id);
  if (type === null) {
    const err = new Error("Type not found");
    err.status = 404;
    return next(err);
  }
  res.render("teatype_form", {
    title: "Update type",
    type: type,
  });
});
exports.teatype_update_post = [
  body("name", "Name must contain at least 3 letters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("description", "Description must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const type = new Type({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      res.render("teatype_form", {
        title: "Add a new tea type",
        type: type,
        errors: errors.array(),
      });
    } else {
      const updatedType = await Type.findByIdAndUpdate(req.params.id, type, {});
      res.redirect(updatedType.url);
    }
  }),
];
