const Jwt = require('jsonwebtoken');
const CryptoJs = require('crypto-js');
const Controller = require('../Controller');
const UserModel = require('../../models/Users');

/* Validators */
const Validators = require('../../validators/Auth')

class Signup extends Controller {
    constructor() { super(); }

    async signup(req, res) {
        try {
            const Body = req.body;
            const Validator = await Validators.register(Body, UserModel);

            if (Validator.status) {
                return super.response(res,
                    400,
                    'There are some errors in your request. Please, try again.', {},
                    Validator.errors);
            }

            /* Create The User */
            let newUser = new UserModel({
                firstName: Body.firstName,
                lastName: Body.lastName,
                email: Body.email,
                status: 1,
                password: CryptoJs.AES.encrypt(Body.password, super.fetchAppConfigs().appKey).toString(),
            });
            const User = await newUser.save();
            const Token = Jwt.sign({
                data: {
                    access: 'user-level',
                    phone: User.phone,
                    email: User.email
                }
            }, super.fetchAppConfigs().appKey, { expiresIn: '3days' });

            return super.response(res, 200, 'Registration Successfull', { user: User, token: Token });
        } catch (e) {
            return super.response(res, 500, 'An unexpected error occurred. Please, try again.', {}, { server: 'Operation Failed' });
        }
    }
}

module.exports = new Signup();