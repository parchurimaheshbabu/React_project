const express = require("express");
const registerrouter = require("../controllers/registercontroller");
const middleware = require("../models/middleware");

const router = express.Router();

router.post("/register", registerrouter.registeruser);
router.post("/login", registerrouter.loginuser);
router.put("/update/:id", registerrouter.updateuser);
router.delete("/delete/:id", registerrouter.deleteuser);
router.get("/allprofiles", middleware, registerrouter.allusers);
router.get("/myprofile", middleware,registerrouter.singleuser);
module.exports = router; 