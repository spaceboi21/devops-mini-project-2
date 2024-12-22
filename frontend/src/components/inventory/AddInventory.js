import React, { useState, useEffect } from 'react';
import SoloAlert from 'soloalert'
import axios from 'axios';
import validation from 'validator'
import '../Home.css'



export default function AddInventory() {

    const [isLoading, setLoading] = useState(false);

    const [itemid, setitemid] = useState("");
    const [itemname, setitemname] = useState("");
    const [itemmodel, setitemmodel] = useState("");
    const [itemcategory, setitemcategory] = useState("");
    const [restocklevel, setrestocklevel] = useState("");
    const [supplier, setsupplier] = useState("");
    const [quantity, setquantity] = useState("");
    const [unitprice, setunitprice] = useState("");
    const [itemdate, setitemdate] = useState("");

    async function submitData(e) {
        setLoading(true)
        try {
            e.preventDefault();
            if (!itemid || !itemname || !itemmodel || !itemcategory || !restocklevel || !supplier || !quantity || !unitprice || !itemdate) {
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
                    itemid, itemname, itemmodel, itemcategory, restocklevel, supplier, quantity, unitprice, itemdate
                }

                const data = (await axios.post("http://localhost:5000/inventory/", newDetails)).status
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
            <h3>Add Inventory</h3><hr />

            <form class="row g-3 needs-validation" id="inputForm2" novalidate>
                <div class="col-md-5 position-relative">
                    <label for="validationTooltip01" class="form-label">Item ID</label>
                    <input type="text" class="form-control" id="validationTooltip01" required
                        onChange={(e) => { setitemid(e.target.value) }} />
                </div>
                <div class="col-md-5 position-relative">
                    <label for="validationTooltip02" class="form-label">Item Name</label>
                    <input type="text" class="form-control" id="validationTooltip02" required
                        onChange={(e) => { setitemname(e.target.value) }} />
                </div>



                <div class="col-md-5 position-relative">
                    <label for="validationTooltip04" class="form-label">Category</label>
                    <select class="form-select" id="validationTooltip04" required onChange={(e) => { setitemcategory(e.target.value) }}>
                        <option selected disabled value="">Choose...</option>
                        <option>Kitchen</option>
                        <option>Furniture</option>
                        <option>Utilities</option>
                    </select>
                </div>


                <div class="col-md-5 position-relative">
                    <label for="validationTooltip01" class="form-label">Item Model</label>
                    <input type="text" class="form-control" id="validationTooltip01" required
                        onChange={(e) => { setitemmodel(e.target.value) }} />
                </div>



                <br />
                <div class="col-md-5 position-relative">
                    <label for="validationTooltip03" class="form-label">Restock Level</label>
                    <input type="number" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setrestocklevel(e.target.value) }} />
                </div>


                <div class="col-md-5 position-relative">
                    <label for="validationTooltip03" class="form-label">Supplier</label>
                    <input type="textarea" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setsupplier(e.target.value) }} />
                </div>

                <div class="col-md-5 position-relative">
                    <label for="validationTooltip03" class="form-label">Quantity</label>
                    <input type="number" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setquantity(e.target.value) }} />
                </div>

                <div class="col-md-5 position-relative">
                    <label for="validationTooltip03" class="form-label">Unit price</label>
                    <input type="number" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setunitprice(e.target.value) }} />
                </div>

                <div class="col-md-5 position-relative">
                    <label for="validationTooltip03" class="form-label">Date</label>
                    <input type="date" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setitemdate(e.target.value) }} />
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