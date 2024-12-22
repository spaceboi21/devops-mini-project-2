const router = require("express").Router();
const Roombooking = require("../../models/room-booking/bookingModel");

//Made new Room booking
router.post('/',async(req,res)=>{
    try{
     
        const savedRoom = await Roombooking.create(req.body);
        res.status(200).send({data : savedRoom});

    }catch(err){
        res.status(500).send({status : err});
    }
})




//View all bookings
router.get('/', async(req,res)=>{
    try{
        const allRooms = await Roombooking.find();
        res.status(200).send({data : allRooms});
    }catch(err){
        res.status(500).send({data : err});
    }
})

module.exports = router;