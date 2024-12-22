import React, { useState, useEffect } from 'react';
import SoloAlert from 'soloalert'
import axios from 'axios';
import validation from 'validator'
import '../Home.css'



export default function AddRoom() {

    const [isLoading, setLoading] = useState(false);

    const [roomname, setRoomname] = useState("");
    const [noOfguests, setnoOfguests] = useState("");
    const [roomtype, setRoomtype] = useState("");
    const [facilities, setFacilities] = useState("");
    const [rentperday, setrentperday] = useState("");
    const [description, setDescription] = useState("");
    const [url1, setUrl1] = useState("");
    const [url2, setUrl2] = useState("");
    const [url3, setUrl3] = useState("");

    async function submitData(e) {
        setLoading(true)
        try {
            e.preventDefault();
            if (!roomname || !noOfguests || !roomtype || !facilities || !rentperday || !description || !url1 || !url2 || !url3) {
                SoloAlert.alert({
                    title: "Oops!",
                    body: "Please fill all fields",
                    icon: "warning",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },
                });
            } else {
                const newDetails = {
                    roomname, noOfguests, roomtype, facilities, rentperday, description, url1, url2,url3
                }
                
                const data =  (await axios.post("http://localhost:5000/room/", newDetails)).status
                if (data === 200) {
                    SoloAlert.alert({
                        title: "Welcome!",
                        body: "New room added successfully",
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
            <h3>Add Room</h3><hr />

            <form class="row g-3 needs-validation" id="inputForm2" novalidate>
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip01" class="form-label">Name</label>
                    <input type="text" class="form-control" id="validationTooltip01" required
                        onChange={(e) => { setRoomname(e.target.value) }} />
                </div>
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip02" class="form-label">No of Guests</label>
                    <input type="number" class="form-control" id="validationTooltip02" required
                        onChange={(e) => { setnoOfguests(e.target.value) }} />
                </div>
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip04" class="form-label">Type</label>
                    <select class="form-select" id="validationTooltip04" required onChange={(e) => { setRoomtype(e.target.value) }}>
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
                    <label for="validationTooltip01" class="form-label">Facilities</label>
                    <input type="text" class="form-control" id="validationTooltip01" required
                        onChange={(e) => { setFacilities(e.target.value) }} />
                </div>

              

                <br />
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip03" class="form-label">Rent per Day(Rs.)</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setrentperday(e.target.value) }} />
                </div>
              
               
                <div class="col-md-5 position-relative">
                    <label for="validationTooltip03" class="form-label">Description</label>
                    <input type="textarea" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setDescription(e.target.value) }} />
                </div>
                <div class="col-md-5 position-relative">
                    <label for="validationTooltip03" class="form-label">Url 1</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setUrl1(e.target.value) }} />
                </div>

                <div class="col-md-5 position-relative">
                    <label for="validationTooltip03" class="form-label">Url 2</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setUrl2(e.target.value) }} />
                </div>

                <div class="col-md-5 position-relative">
                    <label for="validationTooltip03" class="form-label">Url 3</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setUrl3(e.target.value) }} />
                </div>
                


                <div class="col-12" style={{ marginTop: "50px", marginLeft: "65%" }}>
                    <button type="submit" class="btn btn-secondary" data-bs-dismiss="modal" onClick={(e) => { clear(e) }}><i class="fa fa-ban"></i> Clear form</button>&nbsp;&nbsp;&nbsp;
                    <button type="submit" class="btn btn-primary" onClick={(e) => { submitData(e) }}
                        disabled={isLoading} ><i class="fa fa-file-export"></i>  {isLoading ? 'Sending..' : 'Submit form'}</button>
                </div>
            </form>

        </div>
    )
}