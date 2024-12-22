import React, { useState, useEffect } from 'react'
import SoloAlert from 'soloalert'
import { useParams } from "react-router";
import axios from 'axios';

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export default function ViewOneSupplier() {

    const [isLoading, setLoading] = useState(false);

    const [textState, setTextState] = useState(true);
    const [btngrpState1, setBtnGroupstate1] = useState(true);
    const [btngrpState2, setBtnGroupstate2] = useState(false);



    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);

    const [supid, setsupid] = useState(""); 
    const [supname, setsupname] = useState("");
    const [email, setemail] = useState("");
    const [contactnumber, setcontactnumber] = useState("");
    const [nic, setnic] = useState("");
    const [category, setcategory] = useState("");
    const [companyname, setcompanyname] = useState("");
    const [companyaddress, setcompanyaddress] = useState("");
    
    

    const { id } = useParams();

    //This useEffect function used to get supplier data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get(`http://localhost:5000/supplier/${id}`)).data.data

                setsupid(result[0].supid); 
                setsupname(result[0].supname);
                setemail(result[0].email)
                setcontactnumber(result[0].contactnumber);
                setnic(result[0].nic)
                setcategory(result[0].category);
                setcompanyname(result[0].companyname)
                setcompanyaddress(result[0].companyaddress);


                setLoaderStatus(true)
                setTableStatus(false)
                console.log(supid, email)
            } catch (err) {
                console.log(err.message)
            }
        }

        getDetails();
    }, [])


    async function updateData(e) {

        try {
            e.preventDefault();
            const newDetails = {
                supid,supname, email, contactnumber, nic, category, companyname, companyaddress
            }
            const data = await (await axios.put(`http://localhost:5001/supplier/${id}`, newDetails)).status
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
                    const result = await (await axios.delete(`http://localhost:5001/supplier/${id}`)).status
                    console.log(result)

                    if (result === 200) {
                        SoloAlert.alert({
                            title: "Welcome!",
                            body: "Deletion is successful",
                            icon: "success",
                            theme: "dark",
                            useTransparency: true,
                            onOk: function () {
                                window.location = "#"
                                window.location = "/supmanager/view"                                                                

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
                <h3><h3>Edit/Delete Suplier</h3><hr /></h3><hr />
                <form class="row g-3 needs-validation" id="inputForm2" novalidate>
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip01" class="form-label">Sup ID</label>
                    <input type="text" class="form-control" id="validationTooltip01" required defaultValue={supid}
                        onChange={(e) => { setsupid(e.target.value) }} disabled={textState}/>
                </div>

                <div class="col-md-6 position-relative">
                    <label for="validationTooltip01" class="form-label">Name</label>
                    <input type="text" class="form-control" id="validationTooltip01" required defaultValue={supname}
                        onChange={(e) => { setsupname(e.target.value) }} disabled={textState}/>
                </div>

                <div class="col-md-6 position-relative">
                    <label for="validationTooltip02" class="form-label">Email</label>
                    <input type="text" class="form-control" id="validationTooltip02" required defaultValue={email}
                        onChange={(e) => { setemail(e.target.value) }} disabled={textState}/>
                </div><br />
               
                <div class="col-md-6 position-relative">
                <label for="validationTooltip02" class="form-label">Contact Number</label>
                    {/*<input type="text" class="form-control" id="validationTooltip02" required defaultValue={contactnumber}
                        onChange={(e) => { setcontactnumber(e.target.value) }} disabled={textState}/>*/}

                <PhoneInput
                placeholder="Enter phone number" type="textarea" class="form-control" id="validationTooltip03"
                value={contactnumber}
                onChange={setcontactnumber}/>

                
                </div><br />

                   
                <div class="col-md-6 position-relative">
                <label for="validationTooltip02" class="form-label">Nic</label>
                    <input type="text" class="form-control" id="validationTooltip02" required defaultValue={nic}
                        onChange={(e) => { setnic(e.target.value) }} disabled={textState}/>
                </div><br />
                
                <div class="col-md-6 position-relative">
                <label for="validationTooltip04" class="form-label">Category</label>
                    <select class="form-select" id="validationTooltip04" required disabled={textState} onChange={(e) => { setcategory(e.target.value) }}>
                    <option selected disabled>{category}</option>
                        <option>Food</option>
                        <option>Furniture</option>
                    </select>
                </div>

                <div class="col-md-6 position-relative">
                    <label for="validationTooltip03" class="form-label">Company Name</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setcompanyname(e.target.value) }} defaultValue={companyname} disabled={textState}/>
                </div>

                <div class="col-md-6 position-relative">
                    <label for="validationTooltip03" class="form-label">Company Address</label>
                    <input type="text" class="form-control" id="validationTooltip03" disabled={textState} required defaultValue={companyaddress}
                        onChange={(e) => { setcompanyaddress(e.target.value) }} />
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