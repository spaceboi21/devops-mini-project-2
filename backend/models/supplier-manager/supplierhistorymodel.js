const mongoose = require("mongoose");

const supplierhistorySchema = new mongoose.Schema({
    supid : { type: String, required : true }, 
    action : { type: String, required : true },
    date : { type: String, required : true },
    amount : { type: String, required : true },
    
});

const supplier = mongoose.model('supplierhistory', supplierhistorySchema);
module.exports = supplier;