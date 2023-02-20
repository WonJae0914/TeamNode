const express = require("express");
const admin = require("../controller/adminController");
const adminRouter = express.Router();
const upload = require("../utils/adminUtil")

adminRouter.get('/home', admin.adminHome)
adminRouter.get('/write', admin.adminWriteG)
adminRouter.post('/write/add', upload, admin.adminWriteP)
adminRouter.get('/list', admin.adminList)
adminRouter.get('/detail/:id', admin.adminDetail)
adminRouter.put('/detail/delete', admin.adminDelete)
adminRouter.get('/edit/:id', admin.adminPutG)
adminRouter.put('/edit', admin.adminPutP)

module.exports = adminRouter;