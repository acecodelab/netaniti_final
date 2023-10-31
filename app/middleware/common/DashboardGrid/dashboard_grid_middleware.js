import { body, validationResult } from 'express-validator'
import fs from "fs";

import common_js from '../../../controller/common/common_controller.js'
import db from '../../../../database/models/index.js'


const getGridValidations = [
    body('signature').not().isEmpty(),
];
const getGridCheckRules = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        common_js.message.try_cathc_err(errors.array(), res)
        return false;
    }

    var jwt_verified = await common_js.jwt_verify(req.header(process.env.TOKEN_HEADER_KEY), req.body.signature)
    if (jwt_verified.status) {
        req.mobile_no = jwt_verified.mobile_no;
        req.mobile_code = jwt_verified.mobile_code;
        req.uid = jwt_verified.uid
        req.id = jwt_verified.id
        req.role = jwt_verified.role
        next()
    }
    else {
        common_js.message.custom_message(res, 403, [{ msg: jwt_verified.message }])
        return
    }



};

export default { getGridValidations, getGridCheckRules }