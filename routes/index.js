const express = require("express");
const router = express.Router();
const teaController = require("../controllers/teaController");
const teatypeController = require("../controllers/teatypeController");

router.get("/", teaController.index);
router.get("/tea/create", teaController.tea_create_get);
router.post("/tea/create", teaController.tea_create_post);
router.get("/tea/:id/delete", teaController.tea_delete_get);
router.post("/tea/:id/delete", teaController.tea_delete_post);
router.get("/tea/:id/update", teaController.tea_update_get);
router.post("/tea/:id/update", teaController.tea_update_post);
router.get("/tea/:id", teaController.tea_detail);
router.get("/teas", teaController.tea_list);

router.get("/type/create", teatypeController.teatype_create_get);
router.post("/type/create", teatypeController.teatype_create_post);
router.get("/type/:id/delete", teatypeController.teatype_delete_get);
router.post("/type/:id/delete", teatypeController.teatype_delete_post);
router.get("/type/:id/update", teatypeController.teatype_update_get);
router.post("/type/:id/update", teatypeController.teatype_update_post);
router.get("/type/:id", teatypeController.teatype_detail);
router.get("/types", teatypeController.teatype_list);

module.exports = router;
