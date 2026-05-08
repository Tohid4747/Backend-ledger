const mongoose=require("mongoose")


const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        index:true//b+ tree 

    },
    status: {
        type:String,
        enum: {
            values: ["Active", "Frozen", "Closed"],
            message: "Status should be either Active, Frozen or Closed",
            default: "Active"
        }


    },
    currency: {
        type: String,
        required: [true, "Currency is required for creating an account "],
        default: "INR"

    },
    //balance will not be stored in the database but will be calculated by ledger/ on the fly based on the transactions
},
{
    timestamps:true

})

accountSchema.index({user:1,status:1})

const accountModel=mongoose.model("account",accountSchema)

module.exports=accountModel