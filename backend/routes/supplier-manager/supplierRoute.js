const router = require("express").Router();
const Supplier = require("../../models/supplier-manager/supplierModel");

//Add new supplier
router.post('/',async(req,res)=>{
    try{
     
        const savedSupplier = await Supplier.create(req.body);
        res.status(200).send({data : savedSupplier});

    }catch(err){
        res.status(500).send({status : err});
    }
})




//View all Suppliers
router.get('/', async(req,res)=>{
    try{
        const allSuppliers = await Supplier.find();
        res.status(200).send({data : allSuppliers});
    }catch(err){
        res.status(500).send({data : err});
    }
})



//update Suppliers
router.route("/:id").put(async(req,res)=>{
    let supplierID = req.params.id;  //get unique user id from data base

    const {supid,supname,email,contactnumber,nic,category,companyname,companyaddress} = req.body;  // get update details from frontend
    

    const updateSupplier = {
        supid,
        supname,
        email,
        contactnumber,
        nic,
        category,
        companyname,
        companyaddress,
        
    }

    const update = await Supplier.findByIdAndUpdate(supplierID,updateSupplier ).then(()=>{
        res.status(200).send({status: "supplier details are updated"});
    }).catch((e)=>{
     //console.log.(err.message);
        console.log(e);
        res.status(500).send({status:"Error in updating supplier details"})
    })

    

})


//This route used to view specific supplier details 


router.get('/:id',async(req,res)=>{
    try{
        let id = req.params.id;
        const supplier = await Supplier.find({_id : id})
        res.status(200).send({data : supplier});

    }catch(err){
        res.status(500).send({data : err});
    }

})


//This route used to delete supplier from table
router.delete('/:id',async(req,res)=>{

    try{
        const id = req.params.id;
        const removedSupplier = await Supplier.findByIdAndDelete(id)
        res.status(200).send({data : removedSupplier});
    
    }catch(err){
        res.status(500).send({data : err});


    }

})


module.exports = router;