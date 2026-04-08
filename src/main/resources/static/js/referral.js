import { isValidName } from "./utility.js";
const baseUrl = "/api/referral";

//adding referral to database
const addBtn = document.querySelector("#addBtn");
let addRes = document.querySelector("#addRes");

if(addBtn != null){
addBtn.addEventListener("click" , async (evt)=>{
    evt.preventDefault();

    let referral = {
        patientId : document.querySelector("#patientId").value,
        healthcareCenterId : document.querySelector("#healthcareCenterId").value,
        referringDoctorId : document.querySelector("#refDrId").value,
        receivingDoctorId : document.querySelector("#recDrId").value,
        diagnosis : document.querySelector("#diagnosis").value,
        status : document.querySelector("#status").value
    }

    if(!referral.diagnosis.trim() || !referral.status.trim() || !referral.patientId || !referral.healthcareCenterId || 
                                     !referral.referringDoctorId || !referral.receivingDoctorId){
        addRes.innerHTML = `<h2 class="failure">HealthcareCenter cannot be added as fields are empty</h2>`;
        return;
    }else if(referral.diagnosis / 1){
        addRes.innerHTML = `<h2 class="failure">Diagnosis should not contain numbers</h2>`;
        return;
    }


    let response = await fetch(baseUrl+"/add" , {
        method:"POST", 
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(referral)
    })

    if(!response.ok){
        addRes.innerHTML = `<h2 class="failure">Error has occurred with status code: ${response.status}</h2>`;
        return;
    }
    addRes.innerHTML = `<h2 class="success">Referral has been added of Patient Id: ${referral.patientId}</h2>`;
})
}










//getting referral
const getAllBtn = document.querySelector("#getAllBtn");
const getIdBtn = document.querySelector("#getIdBtn");
let table = document.querySelector("#referralTable");

//all referrals
if(getAllBtn != null){
getAllBtn.addEventListener("click", async(evt) => {
    evt.preventDefault();

    let response = await fetch(baseUrl+"/all");
    let result = await response.json();

    
    table.innerHTML = `<tr>
                            <th>Id</th>
                            <th>Patient Id</th>
                            <th>HealthcareCenter Id</th>
                            <th>Referring Doctor Id</th>
                            <th>Receiving Doctor Id</th>
                            <th>Diagnosis</th>
                            <th>Status</th>
                        </tr>`

    result.forEach(element => {        
        table.innerHTML += `<tr>
                                <td>${element.id}</td>
                                <td>${element.patientId}</td>
                                <td>${element.healthcareCenterId}</td>
                                <td>${element.referringDoctorId}</td>
                                <td>${element.receivingDoctorId}</td>
                                <td>${element.diagnosis}</td>
                                <td>${element.status}</td>
                            </tr>`
    });
})
}


//by id
if(getIdBtn != null){
    getIdBtn.addEventListener("click" , async (evt) => {
        evt.preventDefault();
        
        const container = document.querySelector("#getContainer");
        container.innerHTML = `<input type="number" placeholder="Enter Referral Id" id="drId" 
                                        style : {padding:5px}> <br> <br>              
                                <button id="getReferralBtn">Search</button>`;

        const getReferralBtn = document.querySelector("#getReferralBtn");
        if(getReferralBtn != null){
            getReferralBtn.addEventListener("click" , async (evt) => {
                evt.preventDefault();

                let drId = document.querySelector("#drId").value;
                let getRes = document.querySelector("#getRes");

                if(!drId){
                    getRes.innerHTML = `<h2 class="failure">Kindly Enter Id first</h2>`;
                    return;
                }

                let response = await fetch(baseUrl + `/${drId}`);
                let result = await response.json();

                if(!response.ok){
                    getRes.innerHTML = `<h3 class="failure">Error occured with status code: ${response.status} 
                                        or id was not found</h3>`;
                    return;
                }

                getRes.innerHTML = `<table id="finalTable">
                                    <tr>
                                        <th>Id</th>
                                        <th>Patient Id</th>
                                        <th>HealthcareCenter Id</th>
                                        <th>Referring Doctor Id</th>
                                        <th>Receiving Doctor Id</th>
                                        <th>Diagnosis</th>
                                        <th>Status</th>
                                    </tr>
                                    <tr>
                                        <td>${result.id}</td>
                                        <td>${result.patientId}</td>
                                        <td>${result.healthcareCenterId}</td>
                                        <td>${result.referringDoctorId}</td>
                                        <td>${result.receivingDoctorId}</td>
                                        <td>${result.diagnosis}</td>
                                        <td>${result.status}</td>
                                    </tr>
                            </table>`;              
            })
        }
    })
}














//update referral
const validateBtn = document.querySelector("#checkUpdateReferralBtn");
if(validateBtn != null){
    validateBtn.addEventListener("click" , async (evt) => {
        evt.preventDefault();

        const patId = document.querySelector("#updatePatientId").value;
        const refId = document.querySelector("#updateReferralId").value;
        const updateContainer = document.querySelector("#updateReferralContainer");
        const updateRes = document.querySelector("#updateRes");

        //if input empty
        if(!patId || !refId){
            updateRes.innerHTML = `<h2 class="failure">Cannot Update Referral without entering Credentials</h2>`;
            return;
        }

        //if input not empty
        let response = await fetch(baseUrl+`/${refId}`);
        let result = await response.json();

        //if credentials dosen't match
        if(result.id != refId || result.patientId != patId){
            updateRes.innerHTML = `<h2 class="failure">Referral Id or Patient Id is wrong! Please try again</h2>`;
            return;
        }

        //if valid credentials
        updateContainer.innerHTML = `<h3 class="success">Now Enter Details which you want to Update for Referral Id: ${refId}</h3>`;
        updateRes.innerHTML = `
        <form id="referralForm">
            <input type="number" placeholder="Patient Id" id="updatePatientId"><br>
            <input type="number" placeholder="HealthcareCenter Id" id="updateHealthcareCenterId"><br>
            <input type="number" placeholder="Referring Doctor Id" id="upReferringDoctorId"><br>
            <input type="number" placeholder="Receiving Doctor Id" id="upReceivingDoctorId"><br>
            <input type="text" placeholder="Diagnosis" id="updateDiagnosis"><br>
            <input type="text" placeholder="Status" id="updateStatus"><br>
            <button type="submit" id="addBtn">Update Referral</button>
        </form>`;

        //taking new input
        const addBtn = document.querySelector("#addBtn");
        if(addBtn != null){
        addBtn.addEventListener("click" , async (evt) => {
            evt.preventDefault();

            
            let updatedReferral = {
                id : refId,
                patientId : document.querySelector("#updatePatientId").value,
                healthcareCenterId : document.querySelector("#updateHealthcareCenterId").value,
                referringDoctorId : document.querySelector("#upReferringDoctorId").value,
                receivingDoctorId : document.querySelector("#upReceivingDoctorId").value,
                diagnosis : document.querySelector("#updateDiagnosis").value,
                status : document.querySelector("#updateStatus").value
            }

            const finalMsg = document.querySelector("#finalMsg");

            //checking if null
            if(!updatedReferral.patientId || !updatedReferral.healthcareCenterId || !updatedReferral.referringDoctorId || 
                !updatedReferral.receivingDoctorId || !updatedReferral.diagnosis.trim() || !updatedReferral.status.trim()){
       
                        finalMsg.innerHTML = `<h2 class="failure">Kindly Enter Details to update</h2>`;
                        return;
            }else if(referral.diagnosis / 1){
                addRes.innerHTML = `<h2 class="failure">Diagnosis should not contain numbers</h2>`;
                return;
            }

            //send data if all clear
            let response = await fetch(baseUrl+`/update/${refId}` , {
                method : "PUT" , 
                headers : {"Content-Type":"application/json"} ,
                body : JSON.stringify(updatedReferral)
            })

            //checking if all is well sended
            //if error occured
            if(!response.ok){
                finalMsg.innerHTML = `<h2 class="failure">Error occured with status code: ${response.status} while updating Referral!</h2>`;
                return;
            }

            //if updated successfully
            finalMsg.innerHTML = `<h2 class="success">Referral has been updated Successfully :) </h2><br>`;

            finalMsg.innerHTML += `<h3 class="success">Check out Updated Referral here: </h3> 
                                    <a href="/html/getData/referral.html">Get Referral</a>`;
        })
        }
    })
}


















//delete referral
const deleteReferralBtn = document.querySelector("#deleteReferralBtn");
if(deleteReferralBtn != null){
    deleteReferralBtn.addEventListener("click" , async (evt) => {
        evt.preventDefault();

        
        const referralId = document.querySelector("#deleteReferralId").value;
        const patientId = document.querySelector("#deletePatientId").value;

        const deleteRes = document.querySelector("#deleteRes");
        const finalMsg = document.querySelector("#deleteFinalMsg");


        //check if fields empty
        if(!referralId || !patientId){
            deleteRes.innerHTML = `<h2 class="failure">Kindly enter credentials first.</h2>`;
            return;
        }

        //if fields not empty
        let response = await fetch(baseUrl+`/${referralId}`);
        let result = await response.json();

        //if credentials dosen't match
        if(result.id != referralId || result.patientId != patientId){
            deleteRes.innerHTML = `<h2 class="failure">Invalid credentials , please try again</h2>`;
            return;
        }

        //if credentials match 
        //check confirmation
        deleteRes.innerHTML = `<h4 class="success">Enter this text for condirmation :Delete -${result.patientId}</h4>
                               <input type="text" placeholder="Enter the confirmation text" id="confirmation"><br>
                               <button type="submit" id="confirmBtn">Confirm</button>`;

        const confirmBtn = document.querySelector("#confirmBtn");
        if(confirmBtn != null){
            confirmBtn.addEventListener("click" , async (evt) => {
                evt.preventDefault();
                
                const confirmation = document.querySelector("#confirmation").value;
                //if confirmation empty
                if(!confirmation.trim()){
                    finalMsg.innerHTML = `<h2 class="failure">Kindly enter the text</h2>`;
                    return;
                }

                //if confirmation invalid
                if(confirmation != `Delete -${result.patientId}`){
                    finalMsg.innerHTML = `<h2 class="failure">Entered text is invalid, try again carefully</h2>`;
                    return;
                }

                //if confirmation valid
                let response = await fetch(baseUrl+`/delete/${referralId}`,{
                    method : "DELETE",
                    headers:{"Content-Type":"application/json"}
                });

                //if error occurs
                if(!response.ok){
                    finalMsg.innerHTML = `<h2 class="failure">Error occured during deletion with status code: ${response.status}<br>
                                    The Referral you are trying to delete is being used by patients, doctors or facilities</h2>`;
                    return;
                }
                
                //if all clear
                finalMsg.innerHTML = `<h2 class="success">The Referral Record has been deleted successfully</h2>`;
            })
        }

    })
}
