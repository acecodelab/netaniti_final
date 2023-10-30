import { body, validationResult, check } from 'express-validator'
import common_js from '../../../controller/common/common_controller.js'
import requestIp from 'request-ip'

const signUpValidations = [
    body('fname').not().isEmpty().customSanitizer((value) => common_js.replaceAll(value, ' ', '')),
    body('lname').not().isEmpty().customSanitizer((value) => common_js.replaceAll(value, ' ', '')),
    body('gender').not().isEmpty().customSanitizer((value) => common_js.replaceAll(value, ' ', '')),
    body('mobile_code').not().isEmpty(),
    body('mobile_no').not().isEmpty(),
    body('email').isEmail(),
    body('dob').not().isEmpty(),
    body('latitude').not().isEmpty(),
    body('longitude').not().isEmpty(),
    body('last_latitude').not().isEmpty(),
    body('last_longitude').not().isEmpty(),
    body('role').not().isEmpty().customSanitizer((value) => common_js.replaceAll(value, ' ', ''))
];
const signUpCheckRules = async (req, res, next) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            common_js.message.try_cathc_err(errors.array(), res)
            return

        }
        next();
    }
    catch (e) {
        common_js.message.try_cathc_err(e, res)
        return

    }



};

export default { signUpValidations, signUpCheckRules }