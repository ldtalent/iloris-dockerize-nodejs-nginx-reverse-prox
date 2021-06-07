const Jwt = require('jsonwebtoken');
const Controller = require('../Controller');
const UserModel = require('../../models/Users');

/* Validators */
const Validators = require('../../validators/Auth')

class Login extends Controller {
    constructor() { super(); }

    async login(req, res) {
        try {
            const Body = req.body;
            const Validator = await Validators.login(Body, UserModel);

            if (Validator.status) {
                return super.response(res,
                    400,
                    'There are some errors in your request. Please, try again.', {},
                    Validator.errors);
            }

            /* Login The User */
            const User = await UserModel.findOne({ email: Body.email }).lean();
            const Token = Jwt.sign({
                data: {
                    access: 'user-level',
                    phone: User.phone,
                    email: User.email
                }
            }, super.fetchAppConfigs().appKey, { expiresIn: '3days' });

            return super.response(res, 200, 'Login Successfull', { user: User, token: Token });
        } catch (e) {
            return super.response(res, 500, 'An unexpected error occurred. Please, try again.', {}, { server: 'Operation Failed' });
        }
    }
}

module.exports = new Login();