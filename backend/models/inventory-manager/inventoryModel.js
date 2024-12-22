const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    itemid : { type: String, required : true },
    itemname : { type: String, required : true },
    itemmodel : { type: String, required : true },
    itemcategory : { type: String, required : true },
    restocklevel : { type: Number, required : true },
    supplier : { type: String, required : true },
    quantity : { type: Number, required : true },
    unitprice : { type: Number, required : true },
    itemdate : { type: String, required : true },
});

const inventory = mongoose.model('inventory', inventorySchema);
module.exports = inventory;