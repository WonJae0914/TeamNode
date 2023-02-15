const express = require("express");
const router = express.Router();
const ctrl = require("../controller/mainCtrl");

//browse 
router.get("/browse" , ctrl.output.browse);
// router.post("/browse", upload.single("img"), ctrl.process.browse);

module.exports = router;