const accountModel = require("../models/account.model")

// Importing account model to interact with MongoDB collection


// Controller function for creating a new account
async function createAccountController(req, res) {

    // Getting logged-in user data from request object
    // req.user is added by authentication middleware
    const user = req.user;

    // Creating a new account in database
    // and linking it with logged-in user
    const account = await accountModel.create({
        user: user
    })

    // Sending success response with created account data
    res.status(201).json({
        account
    })

}

// Exporting controller function
module.exports = {
    createAccountController
}