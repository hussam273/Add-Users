const express = require('express');
const multer = require("multer");

const db = require("../data/database");

const storageConfig = multer.diskStorage({
  destination : function(req,file,cb) {
    cb(null, "images");
  },
  filename : function(req,file,cb){
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const router = express.Router();
const upload = multer({storage : storageConfig});

router.get('/',async function(req, res) {
  const users = await db.getDb().collection("users").find().toArray();
  res.render('profiles', {users : users});
});

router.get('/new-user', function(req, res) {
  res.render('new-user');
});

router.post("/profiles",upload.single("image"), async function(req,res){
  const uploadImage = req.file;
  const userData = req.body;

  await db.getDb().collection("users").insertOne({
    name : userData.username,
    path : uploadImage.path
  });
  res.redirect("/");
})

module.exports = router;