const mongoose = require("mongoose");

const roombookingSchema = new mongoose.Schema({
    fname : { type: String, required : true },
    lname : { type: String, required : true },
    roomtype : { type: String, required : true },
    noofguests : { type: Number, required : true },
    from: { type: String, required : true },
    to: { type: String, required : true },
    email : { type: String, required : true },
    contactno : { type: String, required : true },
   

   
});

const roombooking = mongoose.model('roombooking', roombookingSchema);
module.exports = roombooking;