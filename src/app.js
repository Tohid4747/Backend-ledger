// This  APP.JS- is used to configure the sever and to to create an instace of server


const express= require("express");
const cookieParser=require("cookie-parser")

//importing routes
const authRouter=require("./routes/auth.routes")
const accountRouter=require("./routes/accounts.routes")

const app=express();

app.use(express.json())
app.use(cookieParser())


//using Routes
app.use("/api/accounts",accountRouter)
app.use("/api/auth",authRouter) 


module.exports=app;


