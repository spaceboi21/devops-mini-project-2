const router = require("express").Router();

const Customer = require("../../models/customer/customerModel");


//Register Customer

router.post('/', async (req, res) => {
    try {
        const savedCustomer = await Customer.create(req.body);
        res.status(200).send({ data: savedCustomer });

    } catch (err) {
        res.status(500).send({ status: err });
    }
})



//Login
router.post('/login', async (req, res) => {

    const cusemail = req.body.cusemail;
    const password = req.body.password;
    console.log(cusemail)
    const customer = await Customer.findOne({ cusemail })
    if (customer && customer.password === password && customer.cusemail === cusemail) {
        res.status(200).send({ status: customer });
    } else {
        res.status(400).send({ msg: "unautherized user" });
    }
})


module.exports = router;


