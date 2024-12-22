import React, { useState, useEffect } from 'react'
import SoloAlert from 'soloalert'
import { useParams } from "react-router";
import axios from 'axios';


export default function ViewOneInventory() {

    const [isLoading, setLoading] = useState(false);

    const [textState, setTextState] = useState(true);
    const [btngrpState1, setBtnGroupstate1] = useState(true);
    const [btngrpState2, setBtnGroupstate2] = useState(false);



    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);



    const [itemid, setitemid] = useState("");
    const [itemname, setitemname] = useState("");
    const [itemmodel, setitemmodel] = useState("");
    const [itemcategory, setitemcategory] = useState("");
    const [restocklevel, setrestocklevel] = useState("");
    const [supplier, setsupplier] = useState("");
    const [quantity, setquantity] = useState("");
    const [unitprice, setunitprice] = useState("");
    const [itemdate, setitemdate] = useState("");


    const { id } = useParams();

    //This useEffect function used to get room data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get(`http://localhost:5000/inventory/${id}`)).data.data
                setitemid(result[0].itemid);
                setitemname(result[0].itemname)
                setitemmodel(result[0].itemmodel);
                setitemcategory(result[0].itemcategory)
                setrestocklevel(result[0].restocklevel);
                setsupplier(result[0].supplier)
                setquantity(result[0].quantity);
                setunitprice(result[0].unitprice)
                setitemdate(result[0].itemdate);

                setLoaderStatus(true)
                setTableStatus(false)
                console.log(itemid, itemmodel)
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
                itemid, itemname, itemmodel, itemcategory, restocklevel, supplier, quantity, unitprice, itemdate
            }
            const data = await (await axios.put(`http://localhost:5000/inventory/${id}`, newDetails)).status
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
                    const result = await (await axios.delete(`http://localhost:5000/inventory/${id}`)).status
                    console.log(result)

                    if (result === 200) {
                        SoloAlert.alert({
                            title: "Welcome!",
                            body: "Deletion is successful",
                            icon: "success",
                            theme: "dark",
                            useTransparency: true,
                            onOk: function () {
                                window.location = "/inventorymanager/view"
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
                <h3>Edit/Delete Inventory</h3><hr />
                <form class="row g-3 needs-validation" id="inputForm2" novalidate>
                <div class="col-md-5 position-relative">
                    <label for="validationTooltip01" class="form-label">Item ID</label>
                    <input type="text" class="form-control" id="validationTooltip01" required defaultValue={itemid}
                        onChange={(e) => { setitemid(e.target.value) }} disabled={textState}/>
                </div>

                <div class="col-md-5 position-relative">
                    <label for="validationTooltip02" class="form-label">Item Name</label>
                    <input type="text" class="form-control" id="validationTooltip02" required defaultValue={itemname}
                        onChange={(e) => { setitemname(e.target.value) }} disabled={textState}/>
                </div><br />
               
                <div class="col-md-5 position-relative">
                    <label for="validationTooltip04" class="form-label">Category</label>
                    <select class="form-select" id="validationTooltip04" required disabled={textState} onChange={(e) => { setitemcategory(e.target.value) }}>
                        <option selected disabled>{itemmodel}</option>
                        <option>Kitchen</option>
                        <option>Furniture</option>
                        <option>Utilities</option>
                    </select>
                </div>
                   
                <div class="col-md-5 position-relative">
                    <label for="validationTooltip03" class="form-label">Item Model</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setitemmodel(e.target.value) }} defaultValue={itemcategory} disabled={textState}/>
                </div>
                <div class="col-md-5 position-relative">
                    <label for="validationTooltip03" class="form-label">Restock Level</label>
                    <input type="number" class="form-control" id="validationTooltip03" disabled={textState} required defaultValue={restocklevel}
                        onChange={(e) => { setrestocklevel(e.target.value) }} />
                </div>

                <div class="col-md-5 position-relative">
                    <label for="validationTooltip03" class="form-label">Supplier</label>
                    <input type="text" class="form-control" id="validationTooltip03" disabled={textState} required defaultValue={supplier}
                        onChange={(e) => { setsupplier(e.target.value) }} />
                </div>

                <div class="col-md-5 position-relative">
                    <label for="validationTooltip03" class="form-label">Quantity</label>
                    <input type="number" class="form-control" id="validationTooltip03" disabled={textState} required defaultValue={quantity}
                        onChange={(e) => { setquantity(e.target.value) }} />
                </div>

                <div class="col-md-5 position-relative">
                    <label for="validationTooltip03" class="form-label">Unit Price</label>
                    <input type="number" class="form-control" id="validationTooltip03" disabled={textState} required defaultValue={unitprice}
                        onChange={(e) => { setunitprice(e.target.value) }} />
                </div>

                <div class="col-md-5 position-relative">
                    <label for="validationTooltip03" class="form-label">Date</label>
                    <input type="date" class="form-control" id="validationTooltip03" disabled={textState} required defaultValue={itemdate}
                        onChange={(e) => { setitemdate(e.target.value) }} />
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
