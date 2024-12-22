import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import SoloAlert from 'soloalert'
import validation from 'validator'
import jspdf from 'jspdf'
import "jspdf-autotable"

export default function ViewAllRoomBookings() {

    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);


    const [search, setsearch] = useState("");
    const [filtered, setfiltered] = useState([]);

    const [AllBookings, setAllBookings] = useState([]);





    //This useEffect function used to get all Inventorys data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get("http://localhost:5000/booking/")).data.data
                setAllBookings(result);
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
            AllBookings.filter(items => {
                return items.fname.toLowerCase().includes(search.toLowerCase())
                    || items.lname.toLowerCase().includes(search.toLowerCase())
                    || items.roomtype.toLowerCase().includes(search.toLowerCase())
                    || items.email.toLowerCase().includes(search.toLowerCase())
            })
        )

    }, [search, AllBookings])}


    //This function used to generate a pdf
    function generatePDF(tickets) {
        const doc = new jspdf();
        const tableColumn = ["First Name", "Last Name", "Room Type", "No of Guests", "From","To", "Email","Contact"];
        const tableRows = [];

        tickets.slice(0).reverse().map(ticket => {
            const ticketData = [
                ticket.fname,
                ticket.lname,
                ticket.roomtype,
                ticket.noofguests,
                ticket.from,
                ticket.to,
                ticket.email,
                ticket.contactno,
               
            ];
            tableRows.push(ticketData);
        });

        doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8 }, startY: 35 });
        const date = Date().split(" ");
        const dateStr = date[1] + "-" + date[2] + "-" + date[3];
        doc.text("Room-Bookings-Report", 14, 15).setFontSize(12);
        doc.text(`Report Generated Date - ${dateStr} `, 14, 23);
        doc.save(`Room-Booking-Report_${dateStr}.pdf`);

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
                        <button type="button" class="btn btn-outline-danger" id="pdfButton" onClick={(e) => { generatePDF(AllBookings) }}><i className="fa fa-file-pdf"></i>  PDF</button>
                    </div>
                </nav><hr />

                <div className="bodyContent">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Room Type</th>
                                <th scope="col">No of Guests</th>
                                <th scope="col">From</th>
                                <th scope="col">To</th>
                                <th scope="col">Email</th>
                                <th scope="col">Contact</th>
            
                                
                            </tr>
                        </thead>
                        <tbody>

                            {filtered.slice(0).reverse().map((Bookings) => {
                                return <tr>
                                    <td>{Bookings.fname}</td>
                                    <td>{Bookings.lname}</td>
                                    <td> {Bookings.roomtype} </td>
                                    <td>{Bookings.noofguests}</td>
                                    <td>{Bookings.from}</td>
                                    <td>{Bookings.to}</td>
                                    <td>{Bookings.email}</td>
                                    <td>{Bookings.contactno}</td>
                                    
                                </tr>

                            })}
                        </tbody>
                    </table>

                </div>

            </div>
        </div>
    )
}