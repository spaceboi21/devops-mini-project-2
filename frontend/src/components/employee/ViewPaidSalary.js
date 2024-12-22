import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import SoloAlert from 'soloalert'
import validation from 'validator'
import jspdf from 'jspdf'
import "jspdf-autotable"
import '../Home.css'

export default function ViewAllPaidSalaries() {

    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);


    const [search, setsearch] = useState("");
    const [filtered, setfiltered] = useState([]);

    const [AllPaidSalaries, setAllPaidSalaries] = useState([]);




    //This useEffect function used to get all emp data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get("http://localhost:5000/paidsalaries")).data
                setAllPaidSalaries(result);
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
    
    
   useEffect(() => {
         setfiltered(
             AllPaidSalaries.filter(items => {
                 return items.paymentid.toLowerCase().includes(search.toLowerCase())
                     || items.emplid.toLowerCase().includes(search.toLowerCase())
                     
             })
         )

     }, [search, AllPaidSalaries])
    
    
    


    //This function used to generate a pdf
    function generatePDF(tickets) {
        const doc = new jspdf();
        const tableColumn = ["Payment ID", "Emp ID", "Email", "Account No", "Basic Salary", "Total Salary","Paid Date"];
        const tableRows = [];

        tickets.slice(0).reverse().map(ticket => {
            const ticketData = [
                ticket.paymentid,
                ticket.emplid,
                ticket.email,
                ticket.accountnumber,
                ticket.basicsalary,
                ticket.totalsalary,
                ticket.paiddate,
               
            ];
            tableRows.push(ticketData);
        });

        doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8 }, startY: 35 });
        const date = Date().split(" ");
        const dateStr = date[1] + "-" + date[2] + "-" + date[3];
        doc.text("Added-PaidSalaryDetais-Report", 14, 15).setFontSize(12);
        doc.text(`Report Generated Date - ${dateStr} `, 14, 23);
        doc.save(`PaidSalary-Details-Report_${dateStr}.pdf`);

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
                        <h3>Paid Salary Management</h3>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                                onChange={e => { setsearch(e.target.value) }} />
                        </form>
                        <button type="button" class="btn btn-outline-danger" id="pdfButton" onClick={(e) => { generatePDF(AllPaidSalaries) }}><i className="fa fa-file-pdf"></i>  PDF</button>
                    </div>
                </nav>
     
                
                <hr />

                <div className="bodyContent">
                    <table className="table table-dark table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Payment ID</th>
                                <th scope="col">Emp ID</th>
                                <th scope="col">Email</th>
                                <th scope="col">Account No</th>
                                <th scope="col">Basic Salary</th>
                                <th scope="col">Total Salary</th>
                                <th scope="col">Paid Date</th>
                                
                                <th></th>  
                            </tr>
                        </thead>
                        <tbody>

                            {filtered.slice(0).reverse().map((Paidsal) => {
                                return <tr>
                                    <td>{Paidsal.paymentid}</td>
                                    <td>{Paidsal.emplid}</td>
                                    <td>{Paidsal.email} </td>
                                    <td>{Paidsal.accountnumber}</td>
                                    <td>{Paidsal.basicsalary}</td>
                                    <td>{Paidsal.totalsalary} </td>
                                    <td>{Paidsal.paiddate}</td>
                           
                                    <td><Link to={"/paidsalManager/view/" + Paidsal._id} className="Edit"> <i className="far fa-edit"></i> </Link></td>
                                </tr>

                            })}
                        </tbody>
                    </table>

                </div>


            </div>
        </div>
    )
}

