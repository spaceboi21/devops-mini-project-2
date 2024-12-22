import React, { useState, useEffect } from 'react';
import SoloAlert from 'soloalert'
import axios from 'axios';
import validation from 'validator'
import '../Home.css'



export default function RoomBookings() {

    const [isLoading, setLoading] = useState(false);

    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [roomtype, setroomtype] = useState("");
    const [noofguests, setnoofguests] = useState("");
    const [from, setfrom] = useState("");
    const [to, setto] = useState("");
    const [email, setemail] = useState("");
    const [contactno, setcontactno] = useState("");


    async function submitData(e) {
        setLoading(true)
        try {
            e.preventDefault();
            if (!fname || !lname || !roomtype || !noofguests  || !from || !to || !email || !contactno ) {
                SoloAlert.alert({
                    title: "Oops!",
                    body: "Please fill all fields",
                    icon: "warning",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },
                });
            }else if (!validation.isEmail(email)) {
                SoloAlert.alert({
                    title: "Oops!",
                    body: "Please enter valid mail address",
                    icon: "error",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },
                });
            
             } else {
                const newDetails = {
                    fname, lname, roomtype, noofguests, from,to, email, contactno
                }
                
                const data =  (await axios.post("http://localhost:5000/booking/", newDetails)).status
                if (data === 200) {
                    SoloAlert.alert({
                        title: "Welcome!",
                        body: "Room booking sucesfull. We will contact you for booking confirmation.",
                        icon: "success",
                        theme: "dark",
                        useTransparency: true,
                        onOk: function () {

                        },
                    });
                }

            }
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    function clear() {

    }
    return (
        <div className="content">
            <h3>Room Booking</h3><hr />

            <form class="row g-3 needs-validation" id="inputForm2" novalidate>
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip01" class="form-label">First Name</label>
                    <input type="text" class="form-control" id="validationTooltip01" required
                        onChange={(e) => { setfname(e.target.value) }} />
                </div>

                <div class="col-md-6 position-relative">
                    <label for="validationTooltip01" class="form-label">Last Name</label>
                    <input type="text" class="form-control" id="validationTooltip01" required
                        onChange={(e) => { setlname(e.target.value) }} />
                </div>

                <div class="col-md-6 position-relative">
                    <label for="validationTooltip04" class="form-label">Room Type</label>
                    <select class="form-select" id="validationTooltip04" required onChange={(e) => { setroomtype(e.target.value) }}>
                        <option selected disabled value="">Choose...</option>
                        <option>Single Standard</option>
                        <option>Single Delux</option>
                        <option>Double Standard</option>
                        <option>Double Delux</option>
                        <option>Superior Standard</option>
                        <option>Superior Delux</option>
                    </select>
                </div>


                <div class="col-md-6 position-relative">
                    <label for="validationTooltip02" class="form-label">No of Guests</label>
                    <input type="number" class="form-control" id="validationTooltip02" required
                        onChange={(e) => { setnoofguests(e.target.value) }} />
                </div>
                

                <div class="col-md-6 position-relative">
                    <label for="validationTooltip03" class="form-label">From</label>
                    <input type="date" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setfrom(e.target.value) }} />
                </div>

                <div class="col-md-6 position-relative">
                    <label for="validationTooltip03" class="form-label">To</label>
                    <input type="date" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setto(e.target.value) }} />
                </div>
               
                <br />
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip01" class="form-label">Email</label>
                    <input type="text" class="form-control" id="validationTooltip01" required
                        onChange={(e) => { setemail(e.target.value) }} />
                </div>

                <div class="col-md-5 position-relative">
                    <label for="validationTooltip03" class="form-label">Contact No</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setcontactno(e.target.value) }} />
                </div>

                
                


                <div class="col-12" style={{ marginTop: "50px", marginLeft: "65%" }}>
                    <button type="submit" class="btn btn-secondary" data-bs-dismiss="modal" onClick={(e) => { clear(e) }}><i class="fa fa-ban"></i> Clear</button>&nbsp;&nbsp;&nbsp;
                    <button type="submit" class="btn btn-primary" onClick={(e) => { submitData(e) }}
                        disabled={isLoading} ><i class="fa fa-file-export"></i>  {isLoading ? 'Sending..' : 'Book Room'}</button>
                </div>
            </form>

        </div>
    )
}