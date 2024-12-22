import React, { useState, useEffect } from 'react'
import SoloAlert from 'soloalert'
import { useParams } from "react-router";
import axios from 'axios';

export default function ViewOneSupplierHistoryRecords() {

    const [isLoading, setLoading] = useState(false);

    const [textState, setTextState] = useState(true);
    const [btngrpState1, setBtnGroupstate1] = useState(true);
    const [btngrpState2, setBtnGroupstate2] = useState(false);



    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);

    const [supid, setsupid] = useState(""); 
    const [action, setaction] = useState("");
    const [date, setdate] = useState("");
    const [amount, setamount] = useState("");
    
    
    

    const { id } = useParams();

    //This useEffect function used to get supplier data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get(`http://localhost:5000/supplier/${id}`)).data.data

                setsupid(result[0].supid); 
                setaction(result[0].action);
               
                setdate(result[0].date);
                setamount(result[0].amount)
                

                setLoaderStatus(true)
                setTableStatus(false)
                console.log(supid, date)
            } catch (err) {
                console.log(err.message)
            }
        }

        getDetails();
    }, [])



    return (
      

        <div class="content">

            <div class="d-flex justify-content-center" >
                <div class="spinner-border" role="status" style={{ width: "10rem", height: "10rem" }} hidden={loaderStatus}>
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>


            <div hidden={tebleStatus}>
                <h3><h3>Supplier History Records</h3><hr /></h3><hr />
                <form class="row g-3 needs-validation" id="inputForm2" novalidate>
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip01" class="form-label">Sup ID</label>
                    <input type="text" class="form-control" id="validationTooltip01" required defaultValue={supid}
                        onChange={(e) => { setsupid(e.target.value) }} disabled={textState}/>
                </div>

                <div class="col-md-6 position-relative">
                    <label for="validationTooltip01" class="form-label">Action</label>
                    <input type="text" class="form-control" id="validationTooltip01" required defaultValue={action}
                        onChange={(e) => { setaction(e.target.value) }} disabled={textState}/>
                </div>

                <div class="col-md-6 position-relative">
                    <label for="validationTooltip02" class="form-label">Date</label>
                    <input type="text" class="form-control" id="validationTooltip02" required defaultValue={date}
                        onChange={(e) => { setdate(e.target.value) }} disabled={textState}/>
                </div><br />
               
                  
                <div class="col-md-6 position-relative">
                <label for="validationTooltip02" class="form-label">Amount</label>
                    <input type="text" class="form-control" id="validationTooltip02" required defaultValue={amount}
                        onChange={(e) => { setamount(e.target.value) }} disabled={textState}/>
                </div><br />
                
                

        
            </form>
            </div>

        </div>
    )
}