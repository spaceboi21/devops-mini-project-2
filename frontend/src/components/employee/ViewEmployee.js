import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import SoloAlert from 'soloalert'
import validation from 'validator'
import jspdf from 'jspdf'
import "jspdf-autotable"
import '../Home.css'

export default function ViewAllEmp() {

    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);


    const [search, setsearch] = useState("");
    const [filtered, setfiltered] = useState([]);

    const [AllEmp, setAllEmp] = useState([]);

    //const [active, setActive] = useState(types[0]);
    //const types = ["Cash", "Credit Card", "Bitcoin"];





    //This useEffect function used to get all emp data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get("http://localhost:5000/employees//")).data.data
                setAllEmp(result);
                setLoaderStatus(true)
                setTableStatus(false)
            } catch (err) {
                console.log(err.message)
            }
        }

        getDetails();
    },[])


    //This useEffect method is used to perform a searching function
    
    
    useEffect(() => {
        setfiltered(
            AllEmp.filter(items => {
                return items.empid.toLowerCase().includes(search.toLowerCase())
                    || items.firstname.toLowerCase().includes(search.toLowerCase())
                    || items.lastname.toLowerCase().includes(search.toLowerCase())
            })
        )

    }, [search, AllEmp])
    
    


    //This function used to generate a pdf
    function generatePDF(tickets) {
        const doc = new jspdf();
        const tableColumn = ["Emp ID", "First Name", "Last Name", "Emp Type", "NIC", "Mobile No","Bank","Branch"];
        const tableRows = [];

        tickets.slice(0).reverse().map(ticket => {
            const ticketData = [
                ticket.empid,
                ticket.firstname,
                ticket.lastname,
                ticket.emptype,
                ticket.nic,
                ticket.mobile,
                ticket.bank,
                ticket.branch
            ];
            tableRows.push(ticketData);
        });

        doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8 }, startY: 35 });
        const date = Date().split(" ");
        const dateStr = date[1] + "-" + date[2] + "-" + date[3];
        doc.text("Added-Employee-Report", 14, 15).setFontSize(12);
        doc.text(`Report Generated Date - ${dateStr} `, 14, 23);
        doc.save(`Employee-Details-Report_${dateStr}.pdf`);

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
                        <h3>Employee Management</h3>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                                onChange={e => { setsearch(e.target.value) }} />
                        </form>
                        <button type="button" class="btn btn-outline-danger" id="pdfButton" onClick={(e) => { generatePDF(AllEmp) }}><i className="fa fa-file-pdf"></i>  PDF</button>
                    </div>
                </nav>
     
                
                <hr />

                <div className="bodyContent">
                    <table className="table table-dark table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Emp ID</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Emp Type</th>
                                <th scope="col">NIC</th>
                                <th scope="col">Mobile</th>
                                <th scope="col">Bank</th>
                                <th scope="col">Branch</th>
                                <th></th>
                                
                            </tr>
                        </thead>
                        <tbody>

                            {filtered.slice(0).reverse().map((Emp) => {
                                return <tr>
                                    <td>{Emp.empid}</td>
                                    <td>{Emp.firstname}</td>
                                    <td>{Emp.lastname} </td>
                                    <td>{Emp.emptype}</td>
                                    <td>{Emp.nic} </td>
                                    <td>{Emp.mobile}</td>
                                    <td>{Emp.bank}</td>
                                    <td>{Emp.branch}</td>
                                    <td><Link to={"/empManager/view/" + Emp._id} className="Edit"> <i className="far fa-edit"></i> </Link></td>
                                </tr>

                            })}
                        </tbody>
                    </table>

                </div>


            </div>
        </div>
    )
}

