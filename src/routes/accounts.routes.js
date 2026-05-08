const express=require("express")
const authMiddleware=require("../middleware/auth.middleware")
const accountController=require("../controllers/account.controller")

const router=express.Router()


/* POST /api/accounts/
-creating a new account
-Proctected route, only authenticated users can create accounts
*/

router.post("/",authMiddleware.authMiddleware, accountController.createAccountController)






module.exports=router