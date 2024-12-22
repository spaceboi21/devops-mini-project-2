const express = require("express");
const router = express.Router();


const Rooms = require("../models/rooms") 


//Get all room details
router.get("/getallrooms",async(req,res)=>{
    try {
        const rooms = await Rooms.find({})
        res.send(rooms)
    } catch (error) {
        return res.status(400).json({message: error});
    }
});

//Add new room to the system
router.post("/addnewroom",async(req,res)=>{

    try {
        const newroom = new Rooms(req.body)
        await newroom.save()

        res.send('New room sucesfully added to the system')
    } catch (error) {
        return res.status(400).json({error});
    }
})
/*router.route("/addroom").post((req,res)=>{
    const roomname = req.body.roomname;
    const noOfguests = req.body.noOfguests;
    const roomtype = req.body.roomtype;
    const facilities = req.body.facilities;
    const rentperday = req.body.rentperday;
    const description = req.body.description;
    const imageurl1 = req.body.imageurl1;
    const imageurl2 = req.body.imageurl2;
    const imageurl3 = req.body.imageurl3;
    const imageurls = [imageurl1, imageurl2, imageurl3];

 

    const newRoom =  new Rooms({ 
        roomname,
        noOfguests,
        roomtype,
        facilities,
        rentperday,
        description,
        imageurls,
        

    })

    //pass room object to mongodb database(Create function)
    newRoom.save().then(()=>{
        //function execute if new room details added to the database
        res.json("New room sucesfully added to the system")

    }).catch((err)=>{
        //If error occurs this fuction execute
        console.log(err);
    });

})*/

 //Update room details
 /*router.route("/updateroom/:id").put(async(req,res)=>{
  let roomID = req.params.id;  //get unique user id from data base

    const updateroom = new Rooms(req.body);

    const update = await Rooms.findByIdAndUpdate(roomID,updateroom ).then(()=>{
        res.status(200).send({status: "room details are updated"});
    }).catch((e)=>{
     
        console.log(e);
        res.status(500).send({status:"Error in updating room datails"})
    })

    

})*/

    //Update employee details
    router.route("/updateroom/:id").put(async(req,res)=>{
        let roomID = req.params.id;  //get unique user id from data base

        const {roomname,noOfguests,roomtype,facilities,rentperday,description,imageurl1,imageurl2,imageurl3} = req.body;  // get update details from frontend
        const imageurls = [imageurl1, imageurl2, imageurl3];

        const updateRoom = {
            roomname,
            noOfguests,
            roomtype,
            facilities,
            rentperday,
            description,
            imageurls
            
        }

        const update = await Rooms.findByIdAndUpdate(roomID,updateRoom ).then(()=>{
            res.status(200).send({status: "Room details are updated"});
        }).catch((e)=>{
         //console.log.(err.message);
            console.log(e);
            res.status(500).send({status:"Error in updating employee datails"})
        })   

    })


   //Delete room details from database
   router.route("/deleteroom/:id").delete(async(req,res)=>{
        
    let roomID = req.params.id;

    await Rooms.findByIdAndDelete(roomID).then(()=>{
        res.status(200).send({status: "room deleted from system"});
    }).catch((e)=>{
        console.log(e);
           res.status(500).send({status:"Error in deleting room datails"})
    })

})

//Test room route
router.route("/test").get((req,res)=>{
    res.json("Room function working");
});


module.exports = router;