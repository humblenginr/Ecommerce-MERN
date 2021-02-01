require('dotenv').config(); //for environment variable declaration

//importing Routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")


const express = require("express")
const mongoose = require("mongoose")

const app = express();
const port = process.env.PORT || 8000;

//importing middleware utils
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");



//connecting to the MONGO database

mongoose.connect(process.env.DATABASE, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex: true
    })
    .then( ()=> {
        console.log("DB CONNECTED");
    }).catch(err => console.log(err))
    
    //using the middleware
    //read the documentation for usage of each middleware
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors());
  

    //My Routes
    app.use("/api", authRoutes)
    app.use("/api", userRoutes)
    app.use("/api", categoryRoutes)
    app.use("/api", productRoutes)
    app.use("/api", orderRoutes)



// listening to the port specified
app.listen(port,() => {
    console.log(`Server is up and running on ${port}`);
} )

