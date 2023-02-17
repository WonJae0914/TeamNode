const express = require("express");
const admin = require("../controller/adminController");
const adminRouter = express.Router();
const methodOverride = require('method-override');
app.use(methodOverride('method-override')); // method-override
app.use(methodOverride('_method')); // method-override

adminRouter.get('/home',admin.adminHome)
adminRouter.get('/write',admin.adminWriteG)
adminRouter.post('/write/add',admin.adminWriteP)
adminRouter.get('/list',admin.adminList)
adminRouter.get('/detail/:id',admin.adminDetail)
adminRouter.put('/detail/delete',admin.adminDelete)
adminRouter.get('/put/:id',admin.adminPutG)
adminRouter.put('/edit',admin.adminPutP)



module.exports = adminRouter;