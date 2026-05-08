const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const emailService = require("../services/email.services")

/*
 * user register controller
 * POST /api/auth/register
 */

async function userRegisterController(req, res) {

    const { email, password, name } = req.body

    // check if user already exists
    const isExists = await userModel.findOne({
        email: email
    })

    if (isExists) {
        return res.status(422).json({
            message: "User already exists with this email",
            status: "failed"
        })
    }

    // create user
    const user = await userModel.create({
        email,
        password,
        name
    })

    // generate token
    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
    )

    // set cookie
    res.cookie("token", token)

    // response
    res.status(201).json({
        user: {
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    })
    await emailService.sendRegistrationEmail(user.email,user.name)
}

/**
 * -user login controller
 * --POST/api/auth/login
 */

async function userLoginController(req,res) {
    const {email,password}=req.body

    

    const user=await userModel.findOne({email}).select("+password")

    if(!user){
        return res.status(401).json({
            message:"Email or password is Invalid"
        })
    }

    const isValidPassword= await user.comparePassword(password)
    
    if(!isValidPassword){
        return res.status(401).json({
            message:"Email or password is Invalid"
        })
    }

    // generate token
    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
    )

    // set cookie
    res.cookie("token", token)

    // response
    res.status(200).json({
        user: {
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    })
}



module.exports = {
    userRegisterController,
    userLoginController
}