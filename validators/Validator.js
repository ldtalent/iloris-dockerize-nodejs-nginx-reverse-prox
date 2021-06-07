/**
 * This is the base validator class. All other validator classes extends this class thus sharing resuable methods.
 *
 * @author Ilori Stephen A <stephenilori458@gmail.com>
 * @returns {Object}
 * @name Validator
 * @param {Null}
 *
 */

const AppConfigs = require('../config/App');
const _Validator = require('validator');

class Validator {
    /* Calling The Galaxy For Help! */
    async validateEmail(Payload, Model) {
        const Response = { status: false, errors: {} };

        try {
            if (!_Validator.isEmail(Payload.email)) {
                Response.status = true;
                Response.errors.email = 'Please, enter a valid email address';
            }

            const checkEmail = await Model.findOne({ email: Payload.email }).lean();
            if (checkEmail) {
                Response.status = true;
                Response.errors.email = 'Sorry, this email address is not available.';
            }

            return Response;
        } catch (e) {
            Response.status = true;
            Response.errors.server = 'Sorry, an unexpected error occurred and your request could not be processed.';

            return Response;
        }
    }

    fetchAppConfigs() {
        return AppConfigs();
    }
}

module.exports = Validator;