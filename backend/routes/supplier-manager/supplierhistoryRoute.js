const router = require("express").Router();
const SupplierHistory = require("../../models/supplier-manager/supplierhistorymodel");

//Add new supplier history
router.post('/',async(req,res)=>{
    try{
     
        const savedSupplier = await SupplierHistory.create(req.body);
        res.status(200).send({data : savedSupplier});

    }catch(err){
        res.status(500).send({status : err});
    }
})




//View all Suppliers history
router.get('/', async(req,res)=>{
    try{
        const allSuppliers = await SupplierHistory.find();
        res.status(200).send({data : allSuppliers});
    }catch(err){
        res.status(500).send({data : err});
    }
})

module.exports = router;