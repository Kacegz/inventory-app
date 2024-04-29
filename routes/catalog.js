const express = require("express");
const router = express.Router();
const teaController = require("../controllers/teaController");
const teatypeController = require("../controllers/teatypeController");

router.get("/", teaController.index);
router.get("/teatypes", teatypeController.teatype_list);

module.exports = router;
