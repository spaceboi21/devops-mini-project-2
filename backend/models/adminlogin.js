const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const adminloginSchema = new Schema({
    username: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true
    }
})
const adminlogin = mongoose.model('Adminlogin', adminloginSchema);
module.exports = adminlogin;
