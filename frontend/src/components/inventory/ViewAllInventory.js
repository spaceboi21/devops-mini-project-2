import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import SoloAlert from 'soloalert'
import validation from 'validator'
import jspdf from 'jspdf'
import "jspdf-autotable"

export default function ViewAllInventory() {

    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);


    const [search, setsearch] = useState("");
    const [filtered, setfiltered] = useState([]);

    const [AllInventory, setAllInventory] = useState([]);

   



    //This useEffect function used to get all Inventorys data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get("http://localhost:5000/inventory/")).data.data
                setAllInventory(result);
                setLoaderStatus(true)
                setTableStatus(false)
                console.log(result)
            } catch (err) {
                console.log(err.message)
            }
        }

        getDetails();
    },[])

    


    //This useEffect method is used to perform a searching function
    {useEffect(() => {
        setfiltered(
            AllInventory.filter(items => {
                return items.itemid.toLowerCase().includes(search.toLowerCase())
                    || items.itemname.toLowerCase().includes(search.toLowerCase())
                    || items.itemmodel.toLowerCase().includes(search.toLowerCase())
                    || items.itemcategory.toLowerCase().includes(search.toLowerCase())
            })
        )

    }, [search, AllInventory])}


    //This function used to generate a pdf
    function generatePDF(tickets) {
        const doc = new jspdf();
        const tableColumn = ["Item ID", "Item Name", "Item Model", "Category", "Supplier", "Quantity","Unit price", "Date", "Restock level"];
        const tableRows = [];

        tickets.slice(0).reverse().map(ticket => {
            const ticketData = [
                ticket.itemid,
                ticket.itemname,
                ticket.itemmodel,
                ticket.itemcategory,
                ticket.supplier,
                ticket.quantity,
                ticket.unitprice,
                ticket.itemdate,
                ticket.restocklevel
            ];
            tableRows.push(ticketData);
        });

        doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8 }, startY: 35 });
        const date = Date().split(" ");
        const dateStr = date[1] + "-" + date[2] + "-" + date[3];
        doc.text("Added-Inventory-Report", 14, 15).setFontSize(12);
        doc.text(`Report Generated Date - ${dateStr} `, 14, 23);
        doc.save(`Inventory-Details-Report_${dateStr}.pdf`);

    }


    return (
        <div class="content">

            <div class="d-flex justify-content-center" >
                <div class="spinner-border" role="status" style={{ width: "10rem", height: "10rem", marginTop: "100px" }} hidden={loaderStatus}>
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

            <div hidden={tebleStatus}>{/* This part used to get all users data into table */}
                <nav className="navbar bg-white" >
                    <div className="container-fluid">
                        <h3>Inventory</h3>
                        <form className="d-flex">
                            <input className="form-control me-1" type="search" placeholder="Search" aria-label="Search"
                                onChange={e => { setsearch(e.target.value) }} />
                        </form>
                        <button type="button" class="btn btn-outline-danger" id="pdfButton" onClick={(e) => { generatePDF(AllInventory) }}><i className="fa fa-file-pdf"></i>  PDF</button>
                    </div>
                </nav><hr />

                <div className="bodyContent">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Item ID</th>
                                <th scope="col">Item Name</th>
                                <th scope="col">Item Model</th>
                                <th scope="col">Category</th>
                                <th scope="col">Restock Level</th>
                                <th scope="col">Supplier</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Unit Price</th>
                                <th scope="col">Item Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {filtered.slice(0).reverse().map((Inventory) => {
                                return <tr>
                                    <td>{Inventory.itemid}</td>
                                    <td>{Inventory.itemname}</td>
                                    <td> {Inventory.itemmodel} </td>
                                    <td>{Inventory.itemcategory}</td>
                                    <td> {Inventory.restocklevel} </td>
                                    <td>{Inventory.supplier}</td>
                                    <td>{Inventory.quantity}</td>
                                    <td>{Inventory.unitprice}</td>
                                    <td>{Inventory.itemdate}</td>
                                    <td><Link to={"/inventorymanager/view/" + Inventory._id} className="Edit"> <i className="far fa-edit"></i> </Link></td>
                                </tr>

                            })}
                        </tbody>
                    </table>

                </div>

            </div>
        </div>
    )
}