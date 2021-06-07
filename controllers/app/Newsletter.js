const Controller = require('../Controller');

const Validators = require('../../validators/Validator');
const UsersModel = require('../../models/Users');
const NewsletterModel = require('../../models/Newsletter');

const Mail = require('../../mail/Mail');

class Newsletter extends Controller {

    constructor() { super(); }

    async registerEmail(req, res) {
        try {
            const Body = req.body;
            const _Validators = new Validators();
            const Validator = await _Validators.validateEmail(Body, NewsletterModel);
            if (Validator.status) {
                return super.response(res,
                    400,
                    'There are some errors in your request. Please, try again.', {},
                    Validator.errors);
            }

            /* Send The User An Email & Signup The User For The Newsletter Program */
            let newNewsletter = new NewsletterModel({ email: Body.email, status: 1, createdAt: global.Date(), updatedAt: global.Date() });
            newNewsletter = await newNewsletter.save();

            /* Send An Actual Email To The User */
            Mail.send({
                    to: Body.email,
                    subject: 'Subscribed Successfully'
                }, 'Newsletter')
                .then((response) => console.log(response))
                .catch((e) => console.log(e));

            /* Send Back An HTTP Response */
            return super.response(res,
                201,
                'Registration Completed', { email: Body.email }, {});
        } catch (e) {
            return super.response(res, 500, 'An unexpected error occurred. Please, try again.', {}, { server: 'Operation Failed' });
        }
    }
}

module.exports = new Newsletter();