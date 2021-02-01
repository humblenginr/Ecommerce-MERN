
const { check } = require('express-validator');
var express = require("express")
var router = express.Router()
const {signout, signin} = require("../controllers/auth")
const {signup,isSignedIn} = require("../controllers/auth")

router.get("/signout",signout);

router.post("/signin",[
    check("email", "Email should be a valid one").isEmail(),
    check("password", "Password is a required field").isLength({ min: 1 }),
   ],
     signin );


router.post("/signup",[
    check("name", "Name should be atleast 3 characters long").isLength({ min: 3 }),
    check("email", "Email should be a valid one").isEmail(),
    check("password", "Password should atleast be atleast 3 characters long").isLength({ min: 3 }),
   ],
     signup );

module.exports = router;