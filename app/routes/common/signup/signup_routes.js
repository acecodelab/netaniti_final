import { Router } from 'express'
const router = Router();


//Signup Routes Start
import signupController from '../../../controller/common/signup/signup_controller.js'
import signupMiddleware from '../../../middleware/common/signup/signup_middleware.js'

router.post("/signup", signupMiddleware.signUpValidations, signupMiddleware.signUpCheckRules, signupController.signup);

//Signup routes End

export default router