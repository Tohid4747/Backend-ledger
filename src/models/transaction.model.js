const mongoose = require("mongoose")





const transactionSchema = new mongoose.Schema({

    fromAcccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [true, "Transaction should be associated with an account"],
        index: true


    },
    toAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [true, "Transaction should be associated to a  account"],
        index: true

    },
    amount: {
        type: Number,
        required: [true, "Amount is required for a transaction"],
        min: [0, "Transaction amount cannot be ngative"]
    },

    status: {
        type: String,
        enum: {
            values: ["Pending", "Completed", "Failed", "Reversed"],
            message: "Status should be either Pending,Completed,Failed or Reversed"
        }, default: "PENDING"

    },
    idempotencyKey: {
        type: String,
        required: [true, "Idempostency key is required for a transaction"],
        index: true,
        unique: true
    }

},
    {
        timestamps: true
    })


    const transactionModel = mongoose.model("transaction", transactionSchema)

    module.exports=transactionModel