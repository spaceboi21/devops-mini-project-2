import React, { useState, useEffect } from 'react';
import SoloAlert from 'soloalert'
import axios from 'axios';
import validation from 'validator'
import '../Home.css'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'


export default function AddPaidSalary() {

    const [isLoading, setLoading] = useState(false);

    const [paymentid, setpaymentid] = useState("");
    const [emplid, setemplid] = useState("");
    const [email, setemail] = useState("");
    const [accountnumber, setaccountnumber] = useState("");
    const [basicsalary, setbasicsalary] = useState("");
    const [totalsalary, settotalsalary] = useState("");
    const [paiddate, setpaiddate] = useState("");
    //const [branch, setbranch] = useState("");

    //const [value, setValue] = useState()

    async function submitData(e) {


        setLoading(true)
        try {
            e.preventDefault();
            if (!paymentid || !emplid || !email || !accountnumber || !basicsalary || !totalsalary || !paiddate) {
                SoloAlert.alert({
                    title: "Oops!",
                    body: "Please fill all fields",
                    icon: "warning",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },
                });
            } else if (!validation.isEmail(email)) {
                SoloAlert.alert({
                    title: "Oops!",
                    body: "Please enter valid email",
                    icon: "error",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },
                });
            }

            else {
                const newDetails = {
                    paymentid, emplid, email, accountnumber, basicsalary, totalsalary, paiddate
                }

                const data = (await axios.post("http://localhost:5000/paidsalaries/", newDetails)).status
                if (data === 200) {
                    SoloAlert.alert({
                        title: "Welcome!",
                        body: "New Employee added successfully",
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
            <h3>Add Paid Salary Details</h3><hr />

            <form class="row g-3 needs-validation" id="inputForm2" novalidate>
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip01" class="form-label">Payment ID</label>
                    <input type="text" class="form-control" id="validationTooltip01" required
                        onChange={(e) => { setpaymentid(e.target.value) }} />
                </div>


                <div class="col-md-6 position-relative">
                    <label for="validationTooltip04" class="form-label">Emp ID</label>
                    <select class="form-select" id="validationTooltip04" required onChange={(e) => { setemplid(e.target.value) }}>
                        <option selected disabled value="">Choose...</option>
                        <option>E112</option>
                        <option>E111</option>

                    </select>
                </div>

                <div class="col-md-6 position-relative">
                    <label for="validationTooltip02" class="form-label">Email</label>
                    <input type="gmail" class="form-control" id="validationTooltip02" required
                        onChange={(e) => { setemail(e.target.value) }} />
                </div>




                <div class="col-md-6 position-relative">
                    <label for="validationTooltip03" class="form-label">Account No</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setaccountnumber(e.target.value) }} />
                </div>

                <br />
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip03" class="form-label">Basic Salary</label>
                    <input type="number" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setbasicsalary(e.target.value) }} />
                </div>


                <div class="col-md-6 position-relative">
                    <label for="validationTooltip03" class="form-label">Total Salary No</label>
                    {<input type="number" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { settotalsalary(e.target.value) }} />}



                </div>


                <div class="col-md-6 position-relative">
                    <label for="validationTooltip03" class="form-label">Paid Date</label>
                    <input type="date" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setpaiddate(e.target.value) }} />
                </div>
                {/*<div class="col-md-6 position-relative">
                    <label for="validationTooltip04" class="form-label">Branch</label>
                    <select class="form-select" id="validationTooltip04" required onChange={(e) => { setbranch(e.target.value) }}>
                        <option selected disabled value="">Choose...</option>
                        <option>GALLE</option>
                        <option>GALLE CITY</option>
                        <option>COLOMBO FORT</option>
                        <option>KOLLUPITIYA</option>
                        <option>MATARA</option>
                        <option>JAFFNA</option>
                        <option>GAMPAHA</option>
                        <option>KURUNEGALA</option>
                        <option>AMBALAGODA</option>
                    </select>
                </div>*/}

                <div class="col-12" style={{ marginTop: "50px", marginLeft: "65%" }}>
                    <button type="submit" class="btn btn-secondary" data-bs-dismiss="modal" onClick={(e) => { clear(e) }}><i class="fa fa-ban"></i> Clear form</button>&nbsp;&nbsp;&nbsp;
                    <button type="submit" class="btn btn-primary" onClick={(e) => { submitData(e) }}
                        disabled={isLoading} ><i class="fa fa-file-export"></i>  {isLoading ? 'Sending..' : 'Submit form'}</button>
                </div>





            </form>

        </div>
    )
}