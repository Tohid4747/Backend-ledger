require("dotenv").config()


const app=require("./src/app");
//importing db
const connectToDb=require("./src/config/db")

connectToDb()


app.listen(3000,()=>{
    console.log("Server Running at port 3000");

}); 


