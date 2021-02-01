const express = require("express");
const app = express();

const port = 8000;

app.listen(port, () => {
    console.log("server is up and running");
})

app.get("/",(req,res) => {

    res.send("HEllo world, this is working completely fine!!")
} )
const admin = (req,res) => {
    res.send("this is admins")
}

const isAdmin = (req,res, next) => {
    console.log("Is admin is running");
    next();
}

//note that next should always be passed on to the middleware,
// otherwise it shows a reference error
// but all the third party packages usually have next prebuilt in them
//in such cases we dont have to worry

const isLoggedIn = (req,res,next) => {
    console.log("Logged in");
    next();
}

app.get("/admin", isLoggedIn,isAdmin, admin) //here isAdmin is the middleware