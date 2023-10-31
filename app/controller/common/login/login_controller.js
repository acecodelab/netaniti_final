import db from '../../../../database/models/index.js'
import common_js from '../../../controller/common/common_controller.js'

const login = async (req, res) => {
    if (!req.body) {

        common_js.message.went_wrong(res)
        return
    }
    else {
        try {
            var result = await common_js.genrateJWTUser(req)
            common_js.message.data_found(result, res)
            return

        } catch (e) {
            console.log(process.env.ERROR_CODE_2, e)
        }
    }
}

export default { login }
