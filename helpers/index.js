const dbValidators = require("./db_validators");
const generateJWT = require("./generate-jwt");
const googleVerify = require("./google-verify");
const uploadFile = require("./uploadFile");

module.exports = {
    ...dbValidators,
    ...generateJWT,
    ...googleVerify,
    ...uploadFile
}
