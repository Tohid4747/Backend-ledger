const mongoose=require("mongoose");

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Server is connneted to DB");
    })
    .catch(err=>{
        console.log("Error Connecting to DB",err)
        process.exit(1)
    })
}
module.exports=connectToDB