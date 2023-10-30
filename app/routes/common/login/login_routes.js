import { Router } from 'express'
const router = Router();


//Signup Routes Start
import loginController from '../../../controller/common/login/login_controller.js'
import loginMiddleware from '../../../middleware/common/login/login_middleware.js'

router.post("/login", loginMiddleware.loginValidations, loginMiddleware.loginCheckRules, loginController.login);

//Signup routes End

export default router