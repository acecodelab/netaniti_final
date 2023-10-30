import db from '../../../../database/models/index.js'
import common_js from '../../../controller/common/common_controller.js'


const Login = db.db.m_users;


const login = async (req, res) => {
    if (!req.body) {

        common_js.message.went_wrong(res)
        return
    }
    else {
        try {
            const mobile_code = req.body.mobile_code;
            const mobile_no = req.body.mobile_no;
            const last_latitude = req.body.last_latitude;
            const last_longitude = req.body.last_longitude;

            var loginResult = await Login.findOne({
                where: {
                    mobile_code: mobile_code,
                    mobile_no: mobile_no
                }
            })
            if (loginResult) {
                await Login.update({
                    last_latitude: last_latitude,
                    last_longitude: last_longitude
                }, {
                    where: {
                        id: loginResult.id
                    }
                })
                common_js.message.data_found(loginResult, res)
            }
            else {
                common_js.message.custom_message(res, 404, { message: "User not found, Please register first" })
            }

        } catch (e) {
            console.log(process.env.ERROR_CODE_2, e)
        }
    }
}

export default { login }
