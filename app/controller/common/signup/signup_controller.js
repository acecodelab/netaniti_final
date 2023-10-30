import db from '../../../../database/models/index.js'
import common_js from '../../../controller/common/common_controller.js'


const SignUp = db.db.m_users;


const signup = async (req, res) => {
    if (!req.body) {

        common_js.message.went_wrong(res)
        return
    }
    else {
        try {
            //Status
            //DEACTIVATE:0
            //ACTIVE :1
            //BLOCKED:2
            //TEMPORARY BLOCKED :3

            const uid = common_js.generateRandomString(12);
            const fname = req.body.fname;
            const lname = req.body.lname;
            const gender = req.body.gender;
            const mobile_code = req.body.mobile_code;
            const mobile_no = req.body.mobile_no;
            const email = req.body.email;
            const dob = req.body.dob;
            const latitude = req.body.latitude;
            const longitude = req.body.longitude;
            const last_latitude = req.body.last_latitude;
            const last_longitude = req.body.last_longitude;
            const status = process.env.USER_STATUS_ACTIVE;
            const role = req.body.role

            const body = {
                uid: uid,
                fname: fname,
                lname: lname,
                gender: gender,
                mobile_code: mobile_code,
                mobile_no: mobile_no,
                email: email,
                email_verified: "N",
                dob: dob,
                kyc_status: "N",
                latitude: latitude,
                longitude: longitude,
                last_login: new Date(),
                last_latitude: last_latitude,
                last_longitude: last_longitude,
                status: status,
                role: role
            }
            var alreadyExist = await SignUp.findAll({
                where: {
                    mobile_no: mobile_no
                }
            })
            if (alreadyExist.length == 0) {
                var newUser = await SignUp.create(body)
                if (newUser) {
                    common_js.message.custom_message(res, 200, [{ msg: "Registered successfully" }])
                    return
                }
                else {
                    common_js.message.custom_message(res, 404, [{ msg: "Unable to register, Try after sometime" }])
                    return
                }
            }
            else {
                common_js.message.custom_message(res, 404, { message: "Mobile number already exists" })
            }

        } catch (e) {
            console.log(process.env.ERROR_CODE_1, e)
        }
    }
}

export default { signup }
