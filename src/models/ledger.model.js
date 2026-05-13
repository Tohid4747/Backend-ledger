const mongoose=require("mongoose")



const LedgerSchema=new mongoose.Schema({
    account:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:[true,"Ledger should be associated with an account"],
        index:true,
        immutable:true
    },

    amount:{
        type:Number,
        required:[true,"Amount is required for a ledger entry"],
        immutable:true
    },
    transaction:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"transaction",
        required:[true,"Ledger should be associated with a transaction"],
        index:true,
        immutable:true
    },
    type:{
        type:String,
        enum:{
            values:["Credit","Debit"],
            message:"Type should be either Credit or Debit",
        },
        required:[true,"Ledger type is required"],
        immutable:true
    }
})

function preventLedgerModification(){
    throw new Error("Ledger entries are immutable and cannot be modified");

}



LedgerSchema.pre('findOneAndUpdate',preventLedgerModification);
LedgerSchema.pre('findOneAndDelete',preventLedgerModification);
LedgerSchema.pre('findOneAndReplace',preventLedgerModification);
LedgerSchema.pre('updateOne',preventLedgerModification);
LedgerSchema.pre('updateMany',preventLedgerModification);
LedgerSchema.pre('update',preventLedgerModification);
LedgerSchema.pre('replaceOne',preventLedgerModification);
LedgerSchema.pre('remove',preventLedgerModification);
LedgerSchema.pre('deleteMany',preventLedgerModification);
LedgerSchema.pre('deleteOne',preventLedgerModification);
//Ledger is a single source of trutn it cannot be modified once created.




const LedgerModel=mongoose.model("ledger",LedgerSchema);