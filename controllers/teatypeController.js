const teaType = require("../models/teaType");

const asyncHandler = require("express-async-handler");

exports.teatype_list = asyncHandler(async (res, req) => {
  const alltypes = await teaType.find().exec();
  res.render("teatype_list", {
    title: "Tea type list:",
    teatype_list: alltypes,
  });
});
