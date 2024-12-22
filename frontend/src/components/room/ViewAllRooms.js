import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import SoloAlert from 'soloalert'
import validation from 'validator'
import jspdf from 'jspdf'
import "jspdf-autotable"

export default function ViewAllRooms() {

    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);


    const [search, setsearch] = useState("");
    const [filtered, setfiltered] = useState([]);

    const [AllRooms, setAllRooms] = useState([]);





    //This useEffect function used to get all rooms data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get("http://localhost:5000/room/")).data.data
                setAllRooms(result);
                setLoaderStatus(true)
                setTableStatus(false)
            } catch (err) {
                console.log(err.message)
            }
        }

        getDetails();
    }, [])



    //This useEffect method is used to perform a searching function
    {
        useEffect(() => {
            setfiltered(
                AllRooms.filter(items => {
                    return items.roomname.toLowerCase().includes(search.toLowerCase())
                        || items.noOfguests.toLowerCase().includes(search.toLowerCase())
                        || items.roomtype.toLowerCase().includes(search.toLowerCase())
                        || items.facilities.toLowerCase().includes(search.toLowerCase())
                })
            )

        }, [search, AllRooms])
    }


    //This function used to generate a pdf
    function generatePDF(tickets) {
        const doc = new jspdf();
        const tableColumn = ["Room Name", "No of Guests", "Room Type", "Facilities", "Rent Per Day", "Description"];
        const tableRows = [];

        tickets.slice(0).reverse().map(ticket => {
            const ticketData = [
                ticket.roomname,
                ticket.noOfguests,
                ticket.roomtype,
                ticket.facilities,
                ticket.rentperday,
                ticket.description
            ];
            tableRows.push(ticketData);
        });

        doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8 }, startY: 35 });
        const date = Date().split(" ");
        const dateStr = date[1] + "-" + date[2] + "-" + date[3];
        doc.text("Added-Room-Report", 14, 15).setFontSize(12);
        doc.text(`Report Generated Date - ${dateStr} `, 14, 23);
        doc.save(`Room-Details-Report_${dateStr}.pdf`);

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
                        <h3>Rooms</h3>
                        <button type="button" class="btn btn-outline-danger" id="pdfButton" onClick={(e) => { generatePDF(AllRooms) }}><i className="fa fa-file-pdf"></i>  PDF</button>
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
                                <th scope="col">Name</th>
                                <th scope="col">No of Guests</th>
                                <th scope="col">Type</th>
                                <th scope="col">Facilities</th>
                                <th scope="col">Rent Per Day(Rs)</th>
                                <th scope="col">Description</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {filtered.slice(0).reverse().map((Room) => {
                                return <tr>
                                    <td>{Room.roomname}</td>
                                    <td>{Room.noOfguests}</td>
                                    <td> {Room.roomtype} </td>
                                    <td>{Room.facilities}</td>
                                    <td> {Room.rentperday} </td>
                                    <td>{Room.description}</td>
                                    <td><Link to={"/roomManager/view/" + Room._id} className="Edit"> <i className="far fa-edit"></i> </Link></td>
                                </tr>

                            })}
                        </tbody>
                    </table>

                </div>

            </div>
        </div>
    )
}