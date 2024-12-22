import React, { useState, useEffect } from 'react'
import SoloAlert from 'soloalert'
import { useParams } from "react-router";
import axios from 'axios';

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export default function ViewOneEmployee() {

    const [isLoading, setLoading] = useState(false);

    const [textState, setTextState] = useState(true);
    const [btngrpState1, setBtnGroupstate1] = useState(true);
    const [btngrpState2, setBtnGroupstate2] = useState(false);



    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);



    const [empid, setempid] = useState("");
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [emptype, setemptype] = useState("");
    const [nic, setnic] = useState("");
    const [mobile, setmobile] = useState("");
    const [bank, setbank] = useState("");
    const [branch, setbranch] = useState("")


    const { id } = useParams();

    //This useEffect function used to get Emp data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get(`http://localhost:5000/employees/${id}`)).data.data
                setempid(result[0].empid);
                setfirstname(result[0].firstname);
                setlastname(result[0].lastname);
                setemptype(result[0].emptype);
                setnic(result[0].nic);
                setmobile(result[0].mobile);
                setbank(result[0].bank);
                setbranch(result[0].branch)

                setLoaderStatus(true);
                setTableStatus(false);
    console.log(empid, firstname)
            } catch (err) {
                console.log(err.message)
            }
        }

        getDetails();
    }, [])


    async function updateData(e) {

        setLoading(true)

        try {
            e.preventDefault();
            const newDetails = {
                empid, firstname, lastname, emptype, nic, mobile, bank, branch
            }
            const data = await (await axios.put(`http://localhost:5000/employees/${id}`, newDetails)).status
            if (data === 200) {
                SoloAlert.alert({
                    title: "Welcome!",
                    body: "Details added successfully",
                    icon: "success",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },
                });
            } else {
                SoloAlert.alert({
                    title: "Oops!",
                    body: "Something went wrong.. plz try again later",
                    icon: "warning",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },
                });
            }
        } catch (err) {

        }

    }

    function edit(e) {
        e.preventDefault();
        setTextState(false)
        setBtnGroupstate1(false)
        setBtnGroupstate2(true)
    }

    function cancel(e) {
        e.preventDefault();
        setTextState(true)
        setBtnGroupstate1(true)
        setBtnGroupstate2(false)
    }


    //This function is used to delete specific user
    function deleteUser(e) {
        e.preventDefault();

        SoloAlert.confirm({

            title: "Confirm Delete",
            body: "Are you sure",
            theme: "dark",
            useTransparency: true,
            onOk: async function () {

                try {
                    const result = await (await axios.delete(`http://localhost:5000/employees/${id}`)).status
                    console.log(result)

                    if (result === 200) {
                        SoloAlert.alert({
                            title: "Welcome!",
                            body: "Deletion is successful",
                            icon: "success",
                            theme: "dark",
                            useTransparency: true,
                            onOk: function () {
                                window.location = "/empManager/view"
                            },

                        });
                    }
                } catch (err) {
                    SoloAlert.alert({
                        title: "Oops!",
                        body: "Something went wrong",
                        icon: "error",
                        theme: "dark",
                        useTransparency: true,
                        onOk: function () {

                        },

                    });
                }
            },
            onCancel: function () {
                SoloAlert.alert({
                    title: "Oops!",
                    body: "You canceled delete request",
                    icon: "warning",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },

                });
            },

        })
    }
    return (
      

        <div class="content">

            <div class="d-flex justify-content-center" >
                <div class="spinner-border" role="status" style={{ width: "10rem", height: "10rem" }} hidden={loaderStatus}>
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>


            <div hidden={tebleStatus}>
                <h3>Edit Employee</h3><hr />
                <form class="row g-3 needs-validation" id="inputForm2" novalidate>
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip01" class="form-label">Emp ID</label>
                    <input type="text" class="form-control" id="validationTooltip01" required defaultValue={empid}
                        onChange={(e) => { setempid(e.target.value) }} disabled={textState}/>
                </div> 
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip02" class="form-label">First Name</label>
                    <input type="text" class="form-control" id="validationTooltip02" required defaultValue={firstname}
                        onChange={(e) => { setfirstname(e.target.value) }} disabled={textState}/>
                </div>
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip02" class="form-label">Last Name</label>
                    <input type="text" class="form-control" id="validationTooltip02" required defaultValue={lastname}
                        onChange={(e) => { setlastname(e.target.value) }} disabled={textState}/>
                </div>
               
               
        
                
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip04" class="form-label">Emp Type</label>
                    <select class="form-select" id="validationTooltip04" required onChange={(e) => { setemptype(e.target.value) }} disabled={textState}>
                    <option selected disabled>{emptype}</option>
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
                    <input type="text" class="form-control" id="validationTooltip03" required defaultValue={nic}
                        onChange={(e) => { setnic(e.target.value) }} disabled={textState}/>
                </div>
              
               
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip03" class="form-label">Mobile No</label>
                    {/*<input type="textarea" class="form-control" id="validationTooltip03" required defaultValue={mobile}
                        onChange={(e) => { setmobile(e.target.value) }} disabled={textState}/>*/}


                <PhoneInput
                placeholder="Enter phone number" type="textarea" class="form-control" id="validationTooltip03"
                value={mobile}
                onChange={setmobile}/>

                </div>


                <div class="col-md-6 position-relative">
                    <label for="validationTooltip04" class="form-label">Bank</label>
                    <select class="form-select" id="validationTooltip04" required onChange={(e) => { setbank(e.target.value) }} disabled={textState}>
                    <option selected disabled>{bank}</option>
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
                    <select class="form-select" id="validationTooltip04" required onChange={(e) => { setbranch(e.target.value) }} disabled={textState}>
                    <option selected disabled>{branch}</option>
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
             

                <div class="col-12" id="btngrp" hidden={btngrpState1} style={{marginTop:"5%"}}>
                        <button class="btn btn-secondary"><i class="fa fa-ban" onClick={(e) => { cancel(e) }}></i> CANCEL</button>&nbsp;&nbsp;&nbsp;
                        <button type="submit" class="btn btn-primary" onClick={(e) => { updateData(e) }}
                            disabled={isLoading} ><i class="fa fa-file-export"></i>  {isLoading ? 'Updating...' : 'UPDATE'}</button>
                    </div>
                    <div class="col-12" id="btngrp" hidden={btngrpState2}  style={{marginTop:"5%"}}>
                        <button type="submit" class="btn btn-primary" onClick={(e) => { edit(e) }}> <i className="far fa-edit"></i> EDIT</button>&nbsp;&nbsp;&nbsp;
                        <button type="submit" class="btn btn-danger" onClick={(e) => { deleteUser(e) }}><i class="fa fa-trash"></i>  DELETE</button>
                    </div>
            </form>
            </div>

        </div>
    )
}
