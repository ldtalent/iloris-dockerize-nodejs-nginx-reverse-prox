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
class Newsletter {
    newsletter() {
        const Schema = Mongoose.Schema;
        const UserBluePrint = new Schema({
            email: {
                type: String,
                unqiue: true,
                required: [true, "The email field is required"]
            },
            status: {
                type: Number,
                default: 1,
                /* 0: Pending, 1: Approved, 2: Suspended. */
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

        const Newsletter = Mongoose.model.Newsletters || Mongoose.model('Newsletters', UserBluePrint);
        return Newsletter;
    }
}

module.exports = new Newsletter().newsletter();