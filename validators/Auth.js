const CryptoJs = require('crypto-js');
const Validator = require('validator');
const BaseValidator = require('./Validator');

class Auth extends BaseValidator {
    constructor() { super(); }

    async login(Payload, Model) {
        const Response = { status: false, errors: {} }

        try {
            const checkAccount = await Model.findOne({ email: Payload.email, status: true, deletedAt: null }).lean();
            if (!checkAccount) {
                Response.status = true;
                Response.errors.account = 'Invalid Auth Credentials. Please, try again.';
            }

            /* Check If The Account Exists & The Password Matches */
            if (checkAccount) {
                const hashedPassword = CryptoJs.AES.decrypt(checkAccount.password, super.fetchAppConfigs().appKey).toString(CryptoJs.enc.Utf8);
                if (hashedPassword !== Payload.password) {
                    Response.status = true;
                    Response.errors.account = 'Invalid Auth Credentials. Please, try again.';
                }
            }

            return Response;
        } catch (e) {
            console.log(e);
            Response.status = true;
            Response.errors.server = 'Sorry, an unexpected error occurred and your request could not be processed.';

            return Response;
        }
    }

    async register(Payload, Model) {
        const Response = { status: false, errors: {} };

        try {
            if (Payload.firstName == '') {
                Response.status = true;
                Response.errors.firstName = 'Sorry, the first name field is required.';
            }

            if (Payload.lastName == '') {
                Response.status = true;
                Response.errors.lastName = 'Sorry, the last name field is required.';
            }

            const checkAccount = await Model.findOne({ email: Payload.email, status: true, deletedAt: { $ne: null } }).lean();
            if (!checkAccount) {
                Response.status = true;
                Response.errors.account = 'Invalid Auth Credentials. Please, try again.';
            }

            if (Payload.password.length < 7) {
                Response.status = true;
                Response.errors.password = 'Sorry, please use a stronger password.';
            }

            return Payload;
        } catch (e) {
            Response.status = true;
            Response.errors.server = 'Sorry, an unexpected error occurred and your request could not be processed.';

            return Response;
        }
    }
}

module.exports = new Auth();