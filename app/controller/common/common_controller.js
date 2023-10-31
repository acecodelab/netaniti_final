import { AccessControl } from 'accesscontrol'
import CryptoJS from 'crypto-js';
import db from '../../../database/models/index.js'
import jwt from 'jsonwebtoken'

const UserDetails = db.db.m_users;
let sequelize = db.db.sequelize;


//Common Messages Start
const message = (function () {

    return {
        permission_denied: function (res) {
            res.status(404).send({ message: [{ msg: "Permission Denied" }] })
        },
        otp_expired: function (res) {
            res.status(404).send({ message: [{ msg: "OTP Expired" }] })
        },
        went_wrong: function (res) {
            res.status(404).send({ message: [{ msg: "Something went wrong 101" }] })
        },
        user_not_found: function (res) {
            res.status(404).send({ message: [{ msg: "User Not Found" }] })
        },
        data_not_found: function (res) {
            res.status(404).send({ message: [{ msg: "Data not found" }] })
        },
        data_found: function (data, res) {
            res.status(200).send({ msg: "Data Found", data: data })
        },
        try_cathc_err: function (err, res) {
            res.status(500).send({ message: err })
        },
        invalid_otp: function (res) {
            res.status(404).send({ message: [{ msg: "Incorrect OTP" }] })
        },
        invalid_current_password: function (res) {
            res.status(404).send({ message: [{ msg: "Old password is incorrect" }] })
        },
        password_not_matched: function (res) {
            res.status(404).send({ message: [{ msg: "Password not matched" }] })
        },
        update_successfull: function (res, text) {
            res.status(200).send({ message: [{ msg: text + " Updated successfully" }] })
        },
        custom_message: function (res, status_code, message) {
            res.status(status_code).send({ message: message })
        }
    };
})();
//Common Messages END


//GENERATE RANDOM STRING START
const generateRandomString = (myLength) => {
    const chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from(
        { length: myLength },
        (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );

    const randomString = randomArray.join("");

    return randomString;
};
//GENERATE RANDOM STRING END 


function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function replaceAll(str, match, replacement) {
    if (str != null && str != undefined && str != '') {
        return str.replace(new RegExp(escapeRegExp(match), 'g'), () => replacement);
    }
    else {
        return null;
    }
}


//Genereate JWT TOKEN START
const genrateJWTUser = async (req) => {
    const mobile_code = req.body.mobile_code;
    const mobile_no = req.body.mobile_no;
    const last_latitude = req.body.last_latitude;
    const last_longitude = req.body.last_longitude;

    var data;
    if (!req.body.refresh_token) {
        var token = generateRandomString(20)
        token = encrypt(token, process.env.SECRETKEY)
        var update_parm = {
            last_login: sequelize.literal('CURRENT_TIMESTAMP'),
            last_latitude: last_latitude,
            last_longitude: last_longitude,
            token: token
        }
      
        data = await UserDetails.update(update_parm, {
            where: {
                mobile_no: mobile_no.trim(),
                mobile_code: mobile_code.trim()
            }, returning: true, plain: true,
        });
    }
    else {
        data = await UserDetails.update({ mobile_no: mobile_no.trim() }, {
            where: {
                mobile_no: mobile_no.trim(),
                mobile_code: mobile_code.trim()
            }, returning: true, plain: true,
        });
    }
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    let jwt_token_data = {
        uid: data[1]['uid'],
        mobile_no: data[1]['mobile_no'],
        mobile_code: data[1]['mobile_code'],
    }
    const jwt_token = jwt.sign(jwt_token_data, jwtSecretKey, { expiresIn: '1d' });

    var jwt_token_refresh = null;
    if (!req.refresh_token) {
        let jwt_refresh_token_data = {
            uid: data[1]['uid'],
            mobile_no: data[1]['mobile_no'],
            mobile_code: data[1]['mobile_code'],
        }
        jwt_token_refresh = jwt.sign(jwt_refresh_token_data, jwtSecretKey, { expiresIn: '30 days' });
    }

    var details_array = []
    var details_object = {}

    details_object =
    {
        id: data[1]['id'],
        uid: data[1]['uid'],
        mobile_code: data[1]['mobile_code'],
        mobile_no: data[1]['mobile_no'],
        fname: data[1]['fname'],
        lname: data[1]['lname'],
        signature: data[1]['token'],
        jwt_token: jwt_token,
        jwt_refresh_token: jwt_token_refresh,
        role: data[1]['role']
    };
    details_array.push(details_object)
    return details_array;
}
//Genereate JWT TOKEN END


//JWT TOKEN VERIFICATION START
const jwt_verify = (token, signature) => {

    try {
        if (token) {
            var verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
            if (verified) {
                return UserDetails.findOne({
                    where: {
                        mobile_no: verified.mobile_no,
                        mobile_code: verified.mobile_code
                    },
                }).then(async data => {
                    if (data) {
                        var successfully_verified =
                        {
                            status: true,
                            message: "User Verified Successfully",
                            uid: verified.uid,
                            email: data.email,
                            role: data.role,
                            id: data.id,
                            mobile_no: data.mobile_no,
                            mobile_code: data.mobile_code,
                            fname: data.fname,
                            lname: data.lname,
                            kyc_status: data.kyc_status,
                        };
                        if (verified.uid === data.uid && verified.mobile_no === data.mobile_no && data.token === signature) {
                            return successfully_verified
                        }
                        else {
                            const result =
                            {
                                status: false,
                                message: "Miscellaneous activity found",
                                uid: null,
                                email: null,
                                role: null,
                                id: null
                            };
                            return result
                        }

                    } else {
                        const result =
                        {
                            status: false,
                            message: "Invalid User Found",
                            uid: null,
                            email: null,
                            role: null,
                            id: null
                        };
                        return result
                    }
                })
            } else {
                const result =
                {
                    status: false,
                    message: "Access Denied",
                    uid: null,
                    email: null,
                    role: null,
                    id: null
                };
                return result
            }
        }
        else {

            const result =
            {
                status: false,
                message: "Token is not found",
                uid: null,
                email: null,
                role: null,
                id: null
            };
            return result
        }
    } catch (e) {
        const result =
        {
            status: false,
            message: "Access Denied",
            uid: null,
            email: null,
            role: null,
            id: null
        };
        return result
    }


}
//JWT TOKEN VERIFICATION END


// ENCRYPTION START
const encrypt = (value, key) => {
    var bytes = CryptoJS.AES.encrypt(value, key).toString();
    return bytes;
}
// ENCRYPTION END

//DECRYPTION START
const decrypt = (ciphertext, key) => {

    var bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8);

};
//DECRYPTION END
export default { message, generateRandomString, replaceAll, genrateJWTUser, encrypt, decrypt, jwt_verify }