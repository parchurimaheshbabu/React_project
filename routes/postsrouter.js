const express = require("express");
const postsrouter = require("../controllers/postscontroller");
const middleware = require("../models/middleware");
// const middleware = require("../models/registermodel");
const router = express.Router();

router.get("/posts/count", postsrouter.count);
router.post("/postaprop", postsrouter.postproperty);
router.post("/upload", postsrouter.uploadFile);
router.get("/allhouses", middleware, postsrouter.allproperties);
router.get("/findPosts", middleware, postsrouter.findapost);

router.get("/myproperties", middleware, postsrouter.myproperties);
router.put("/updateproperty/:post_no", postsrouter.updateproperty);
router.delete("/deletepost/:post_no", middleware, postsrouter.deleteproperty);
module.exports = router;
