import { AccessControl } from 'accesscontrol'

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
export default { message, generateRandomString, replaceAll }