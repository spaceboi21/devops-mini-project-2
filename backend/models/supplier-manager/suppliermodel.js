const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
    supid : { type: String, required : true }, 
    supname : { type: String, required : true },
    email : { type: String, required : true },
    contactnumber : { type: String, required : true },
    nic : { type: String, required : true },
    category : { type: String, required : true },
    companyname : { type: String, required : true },
    companyaddress : { type: String, required : true }, 

   
});

const supplier = mongoose.model('supplier', supplierSchema);
module.exports = supplier;