const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    roomname : { type: String, required : true },
    noOfguests : { type: Number, required : true },
    roomtype : { type: String, required : true },
    facilities : { type: String, required : true },
    rentperday : { type: String, required : true },
    description : { type: String, required : true },
    url1 : { type: String, required : true },
    url2 : { type: String, required : true },
    url3 : { type: String, required : true },
    currentbookings:[],

   
});

const room = mongoose.model('room', roomSchema);
module.exports = room;