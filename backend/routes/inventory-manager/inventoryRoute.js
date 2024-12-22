const router = require("express").Router();
const Inventory = require("../../models/inventory-manager/inventoryModel");

//Add new Inventory
router.post('/', async (req, res) => {
    try {
        const savedInventory = await Inventory.create(req.body);
        res.status(200).send({ data: savedInventory });

    } catch (err) {
        res.status(500).send({ status: err });
    }
})


//View all inventory
router.get('/', async (req, res) => {
    try {
        const allInventory = await Inventory.find();
        res.status(200).send({ data: allInventory });
    } catch (err) {
        res.status(500).send({ data: err });
    }
})



//update inventory
router.route("/:id").put(async (req, res) => {
    let itemID = req.params.id;  //get unique user id from data base

    const { itemid, itemname, itemmodel, itemcategory, restocklevel, supplier, quantity, unitprice, itemdate } = req.body;  // get update details from frontend

    const updateinventory = {
        itemid,
        itemname,
        itemmodel,
        itemcategory,
        restocklevel,
        supplier,
        quantity,
        unitprice,
        itemdate,
    }

    const update = await Inventory.findByIdAndUpdate(itemID, updateinventory).then(() => {
        res.status(200).send({ status: "Inventory details are updated" });
    }).catch((e) => {
        //console.log.(err.message);
        console.log(e);
        res.status(500).send({ status: "Error in updating inventory datails" })
    })


})


//restock
router.route("/restock/:id").put(async (req, res) => {
    try {
        let itemID = req.params.id;  //get unique user id from data base

        const { quantity } = req.body;  // get update details from frontend

        const data = await Inventory.findById(itemID)
        data.quantity = (data.quantity*1) + (quantity*1)
        await data.save()
        res.status(200).send({status: "Inventory details are updated"});

    } catch (e) {

    }


})

//This route used to view specific Inventory details 
router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const inventory = await Inventory.find({ _id: id })
        res.status(200).send({ data: inventory });

    } catch (err) {
        res.status(500).send({ data: err });
    }

})

//This route used to delete inventory from table
router.delete('/:id', async (req, res) => {

    try {
        const id = req.params.id;
        const removedInventory = await Inventory.findByIdAndDelete(id)
        res.status(200).send({ data: removedInventory });


    } catch (err) {
        res.status(500).send({ data: err });
    }

})

module.exports = router;




