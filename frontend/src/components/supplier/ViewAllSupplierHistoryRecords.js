import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import SoloAlert from 'soloalert'
import validation from 'validator'
import jspdf from 'jspdf'
import "jspdf-autotable"



export default function ViewAllSupplierHistoryRecords() {

    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);


    const [search, setsearch] = useState("");
    const [filtered, setfiltered] = useState([]);

    const [AllSuppliers, setAllSuppliers] = useState([]);





    //This useEffect function used to get all suppliers data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get("http://localhost:5000/supplierhistory//")).data.data
                setAllSuppliers(result);
                setLoaderStatus(true)
                setTableStatus(false)
            } catch (err) {
                console.log(err.message)
            }
        }

        getDetails();
    })


    //This useEffect method is used to perform a searching function
    useEffect(() => {
        setfiltered(
            AllSuppliers.filter(items => {
                return items.supid.toLowerCase().includes(search.toLowerCase())
                    || items.action.toLowerCase().includes(search.toLowerCase())
                    || items.amount.toLowerCase().includes(search.toLowerCase())
                    
            })
        )

    }, [search, AllSuppliers])


    //This function used to generate a pdf
    function generatePDF(tickets) {
        const doc = new jspdf();
        const tableColumn = ["Sup ID","Action", "Date", "Amount"];
        const tableRows = [];

        tickets.slice(0).reverse().map(ticket =>{
            const ticketData = [
                ticket.supid, 
                ticket.action,
                ticket.date,
                ticket.amount
               
            ];
            tableRows.push(ticketData);
        });

        doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8 }, startY: 35 });
        const date = Date().split(" ");
        const dateStr = date[1] + "-" + date[2] + "-" + date[3];
        doc.text("Added-supplier-History-Report", 14, 15).setFontSize(12);
        doc.text(`Report Generated Date - ${dateStr} `, 14, 23);
        doc.save(`Supplier-History-Details-Report_${dateStr}.pdf`);

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
                        <h3>Suppliers</h3>
                        <button type="button" class="btn btn-outline-danger" id="pdfButton" onClick={(e) => { generatePDF(AllSuppliers) }}><i className="fa fa-file-pdf"></i>  PDF</button>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                                onChange={e => { setsearch(e.target.value) }} />
                        </form>
                    </div>
                </nav><hr />

                <div className="bodyContent">
                    <table className="table table-dark table-hover">
                        <thead>
                            <tr> 
                                <th scope="col">Sup ID</th>
                                <th scope="col">Action</th>
                                <th scope="col">Date</th>
                                <th scope="col">Amount</th>
                                
                            </tr>
                        </thead>
                        <tbody>

                            {filtered.slice(0).reverse().map((Supplier) => {
                                return <tr>
                                    <td>{Supplier.supid}</td>
                                    <td>{Supplier.action}</td>
                                    <td>{Supplier.date}</td>
                                    <td>{Supplier.amount} </td>
                                    
                                </tr>

                            })}
                        </tbody>
                    </table>

                </div>

            </div>
        </div>
    )
}