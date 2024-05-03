const Tea = require("../models/tea");
const Type = require("../models/teaType");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res) => {
  const [numTeas, numTypes] = await Promise.all([
    Tea.countDocuments({}).exec(),
    Type.countDocuments().exec(),
  ]);
  res.render("index", {
    title: "Tea inventory management app",
    tea_count: numTeas,
    type_count: numTypes,
  });
});
exports.tea_list = asyncHandler(async (req, res) => {
  const allTeas = await Tea.find({}).sort({ name: 1 }).exec();
  res.render("tea_list", {
    title: "Teas list",
    tea_list: allTeas,
  });
});
exports.tea_detail = asyncHandler(async (req, res, next) => {
  const tea = await Tea.findById(req.params.id).populate("category").exec();
  if (tea == null) {
    const err = new Error("Tea not found");
    err.status = 404;
    return next(err);
  }
  res.render("tea_detail", {
    title: "Tea details",
    tea: tea,
  });
});
exports.tea_create_get = asyncHandler(async (req, res) => {
  const allTypes = await Type.find({}).sort({ name: 1 }).exec();
  res.render("tea_form", {
    title: "Add a new tea",
    types: allTypes,
  });
});
exports.tea_create_post = [
  body("name", "Name must be longer than 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("description").optional({ values: "falsy" }).escape(),
  body("category", "Category must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "price must not be empty")
    .isLength({ min: 1 })
    .isNumeric()
    .withMessage("price must be a number")
    .escape(),
  body("quantity", "quantity must not be empty")
    .isLength({ min: 1 })
    .isNumeric()
    .withMessage("quantity must be a number")
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const tea = new Tea({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
    });

    if (!errors.isEmpty()) {
      const allTypes = await Type.find({}).sort({ name: 1 }).exec();
      res.render("tea_form", {
        title: "Add a new tea",
        types: allTypes,
        tea: tea,
        errors: errors.array(),
      });
    } else {
      await tea.save();
      res.redirect(tea.url);
    }
  }),
];
exports.tea_delete_get = asyncHandler(async (req, res) => {
  const tea = await Tea.findById(req.params.id).exec();
  if (tea === null) {
    res.redirect("/teas");
  }
  res.render("tea_delete", {
    title: "Delete tea",
    tea: tea,
  });
});
exports.tea_delete_post = asyncHandler(async (req, res) => {
  await Tea.findByIdAndDelete(req.body.teaid);
  res.redirect("/teas");
});
exports.tea_update_get = asyncHandler(async (req, res) => {
  const [tea, types] = await Promise.all([
    Tea.findById(req.params.id),
    Type.find({}).sort({ name: 1 }).exec(),
  ]);
  if (tea === undefined) {
    const err = new Error("Tea not found");
    err.status = 404;
    return next(err);
  }
  res.render("tea_form", {
    title: "Update tea",
    tea: tea,
    types: types,
  });
});
exports.tea_update_post = [
  body("name", "Name must be longer than 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("description").optional({ values: "falsy" }).escape(),
  body("category", "Category must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "price must not be empty")
    .isLength({ min: 1 })
    .isNumeric()
    .withMessage("price must be a number")
    .escape(),
  body("quantity", "quantity must not be empty")
    .isLength({ min: 1 })
    .isNumeric()
    .withMessage("quantity must be a number")
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const tea = new Tea({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      const allTypes = await Type.find({}).sort({ name: 1 }).exec();
      res.render("tea_form", {
        title: "Add a new tea",
        types: allTypes,
        tea: tea,
        errors: errors.array(),
      });
    } else {
      const newTea = await Tea.findByIdAndUpdate(req.params.id, tea);
      res.redirect(newTea.url);
    }
  }),
];
