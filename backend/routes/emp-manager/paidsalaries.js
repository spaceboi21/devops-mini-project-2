const router = require("express").Router();
const Paidsalaries = require("../../models/emp-manager/paidsalaries");

//add new paidsalarie for the system
router.post('/',async(req,res)=>{

    const paymentid = req.body.paymentid;
    const emplid = req.body.emplid;
    const email = req.body.email;
    const accountnumber = req.body.accountnumber;
    const basicsalary = req.body.basicsalary;
    const totalsalary = req.body.totalsalary;
    const paiddate = Date(req.body.paiddate);
    

    const newPaidsalaries = new Paidsalaries({
        paymentid,
        emplid,
        email,
        accountnumber,
        basicsalary,
        totalsalary,
        paiddate,
        
    })
    //pass employee object to mongodb database(Create function)
    newPaidsalaries.save().then(()=>{
        //function execute if new paidsalary details added to the database
        res.json("New paid salary Added.")
    }).catch((err)=>{
        //If error occurs this fuction execute
        console.log(err)
    })
})

//retrive data in paid sal db
router.route("/").get((req,res)=>{

    Paidsalaries.find().then((paidsalaries)=>{
        res.json(paidsalaries)
    }).catch((err)=>{
        console.log(err)
    })
}) 

{/*
    //update paid sal details
router.route("/update/:id").put(async(req,res)=>{
    let Payment_id = req.params.id;
    const { paymentid,emplid,email,accountnumber,basicsalary,totalsalary,paiddate,} = req.body;

    const updatePaidsalary = {
        paymentid,
        emplid,
        email,
        accountnumber,
        basicsalary,
        totalsalary,
        paiddate,
    }

    Paidsalaries.findByIdAndUpdate(Payment_id,updatePaidsalary).then((UpdateLick)=>{
        res.json("Successfully updated");
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data", error: err.message});
    })
})

//delete paid salary details
router.route("/delete/:id").delete(async(req,res)=>{
    let Payment_id = req.params.id;

    await Paidsalaries.findByIdAndDelete(Payment_id).then(()=>{
        res.status(200).send({status: "Paid Salary details Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete details", error: err.message});

    })
})

//get one paid sal detail
router.route("/get/:id").get(async(req,res)=>{
    let Payment_id = req.params.id;
    Paidsalaries.findById(Payment_id).then((paidsalaries)=>{
        res.json(paidsalaries)
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get paid sal details", error: err.message});
    })
})*/}
module.exports = router;