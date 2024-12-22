import React, { useState, useEffect } from 'react'
import SoloAlert from 'soloalert'
import { useParams } from "react-router";
import axios from 'axios';

export default function RestockInventory() {

    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);
    const [AllInventory, setAllInventory] = useState([]);

    //
    const [quantity, setquantity] = useState("");
    const { id } = useParams();

    //This useEffect function used to get all Inventorys data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get("http://localhost:5000/inventory/")).data.data
                console.log(result)
                setAllInventory(result);
                setLoaderStatus(true)
                setTableStatus(false)
                console.log(result)
                setquantity(result[0].quantity);
            } catch (err) {
                console.log(err.message)
            }
        }

        getDetails();
    }, [])


    //
    //this function to restock items
    async function updateRestock(dat) {
        try {
            console.log(dat)
            
            const newDetails = {
                quantity
            }

            const data = await (await axios.put(`http://localhost:5000/inventory/restock/${dat._id}`, newDetails)).status
            if (data === 200) {
                SoloAlert.alert({
                    title: "Welcome!",
                    body: "Item restocked succesfully",
                    icon: "success",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {
                        window.location.reload(false);
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


    return (
        <div class="content">


            <div hidden={tebleStatus}>{/* This part used to get all users data into table */}


                <h3>Restock Inventory</h3><hr />

                <div className="bodyContent">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Item ID</th>
                                <th scope="col">Item Name</th>
                                <th scope="col">Remaining Items</th>
                                <th scope="col">Restock Level</th>
                                <th scope="col">Restock Amount</th>
                                <th scope="col"> </th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {AllInventory.map((Inventory) => {
                                return <tr>
                                    <td>{Inventory.itemid}</td>
                                    <td>{Inventory.itemname}</td>
                                    <td> {Inventory.quantity} </td>
                                    <td>{Inventory.restocklevel}</td>
                                    <td class="d-flex">
                                        <input class="form-control me-2  bg-light text-dark" type="number" placeholder="Add Restock Amount" aria-label="Search" onChange={(e) => { setquantity(e.target.value)}} />
                                        <button class="btn btn-outline-success  bg-dark text-light" type="submit" onClick={(e) => { updateRestock(Inventory) }}>ADD</button>
                                    </td>

                                </tr>

                            })}

                        </tbody>

                    </table>

                </div>

            </div>
        </div>

    )
}
