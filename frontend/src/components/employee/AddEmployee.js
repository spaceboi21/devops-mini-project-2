import React, { useState, useEffect } from 'react';
import SoloAlert from 'soloalert'
import axios from 'axios';
import validation from 'validator'
import '../Home.css'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'


export default function AddEmployee() {

    const [isLoading, setLoading] = useState(false);

    const [empid, setempid] = useState("");
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [emptype, setemptype] = useState("");
    const [nic, setnic] = useState("");
    const [mobile, setmobile] = useState("");
    const [bank, setbank] = useState("");
    const [branch, setbranch] = useState("");

    //const [value, setValue] = useState()

    async function submitData(e) {
        

        setLoading(true)
        try {
            e.preventDefault();
            if (!empid || !firstname || !lastname || !emptype || !nic || !mobile || !bank || !branch ) {
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
                    empid, firstname, lastname, emptype, nic, mobile, bank, branch
                }
                
                const data =  (await axios.post("http://localhost:5000/employees//", newDetails)).status
                if (data === 200) {
                    SoloAlert.alert({
                        title: "Welcome!",
                        body: "New Employee added successfully",
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
            <h3>Add Employee</h3><hr />

            <form class="row g-3 needs-validation" id="inputForm2" novalidate>
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip01" class="form-label">Emp ID</label>
                    <input type="text" class="form-control" id="validationTooltip01" required
                        onChange={(e) => { setempid(e.target.value) }} />
                </div>
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip02" class="form-label">First Name</label>
                    <input type="text" class="form-control" id="validationTooltip02" required
                        onChange={(e) => { setfirstname(e.target.value) }} />
                </div>
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip02" class="form-label">Last Name</label>
                    <input type="text" class="form-control" id="validationTooltip02" required
                        onChange={(e) => { setlastname(e.target.value) }} />
                </div>
               
               
        
                
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip04" class="form-label">Emp Type</label>
                    <select class="form-select" id="validationTooltip04" required onChange={(e) => { setemptype(e.target.value) }}>
                        <option selected disabled value="">Choose...</option>
                        <option>Part-time</option>
                        <option>Full-time</option>
                        <option>Seasonal </option>
                        <option>Temporary </option>
                        <option>Leased </option>
                        <option>Permanent </option>

                    </select>
                </div>

                <br />
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip03" class="form-label">NIC</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setnic(e.target.value) }} />
                </div>
              
               
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip03" class="form-label">Mobile No</label>
                   {/* {<input type="textarea" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setmobile(e.target.value) }} />}
                        */}


             <PhoneInput
                placeholder="Enter phone number" type="textarea" class="form-control" id="validationTooltip03"
                value={mobile}
                onChange={setmobile}/>

                </div>


                <div class="col-md-6 position-relative">
                    <label for="validationTooltip04" class="form-label">Bank</label>
                    <select class="form-select" id="validationTooltip04" required onChange={(e) => { setbank(e.target.value) }}>
                        <option selected disabled value="">Choose...</option>
                        <option>BOC</option>
                        <option>HNB</option>
                        <option>DFCC</option>
                        <option>SAMPATH</option>
                        <option>PEOPLES</option>
                    </select>
                </div>


                {/*<div class="col-md-6 position-relative">
                    <label for="validationTooltip03" class="form-label">Branch</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setbranch(e.target.value) }} />
                </div>*/}
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip04" class="form-label">Branch</label>
                    <select class="form-select" id="validationTooltip04" required onChange={(e) => { setbranch(e.target.value) }}>
                        <option selected disabled value="">Choose...</option>
                        <option>GALLE</option>
                        <option>GALLE CITY</option>
                        <option>COLOMBO FORT</option>
                        <option>KOLLUPITIYA</option>
                        <option>MATARA</option>
                        <option>JAFFNA</option>
                        <option>GAMPAHA</option>
                        <option>KURUNEGALA</option>
                        <option>AMBALAGODA</option>
                    </select>
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