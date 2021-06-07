/* Base Model & Mongoose ORM */
const Mongoose = require('mongoose');

/**
 * This Class contains the schema required to model a user collection. It also contains reusable methods imported from the mongoose library.
 *
 * @author Ilori Stephen A
 * @returns {Object}
 * @name Signup
 * @alias Register
 * @param {Null}
 *
 */
class User {
    user() {
        const Schema = Mongoose.Schema;
        const UserBluePrint = new Schema({
            firstName: {
                type: String,
                required: [true, "The name field is required"]
            },
            lastName: {
                type: String,
                required: [true, "The name field is required"]
            },
            email: {
                type: String,
                unqiue: true,
                required: [true, "The email field is required"]
            },
            status: {
                type: Number,
                default: 0,
                /* 0: Pending, 1: Approved, 2: Suspended. */
            },
            password: {
                type: String,
                required: [true, "The password field is required"]
            },
            createdAt: {
                type: String,
                default: global.Date()
            },
            updatedAt: {
                type: String,
                default: global.Date()
            }
        });

        const User = Mongoose.model.Users || Mongoose.model('Users', UserBluePrint);
        return User;
    }
}

module.exports = new User().user();