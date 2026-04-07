import { isValidName } from "./utility.js";
const baseUrl = "http://localhost:2000/api/patient";

//adding patient into database
let btn = document.querySelector("#addBtn");
let res = document.querySelector(".res");

if(btn != null){
btn.addEventListener("click"  , async (evt) => {
    evt.preventDefault();

    let patient = {
        username:document.querySelector("#username").value,
        dateOfBirth:document.querySelector("#dateOfBirth").value,
        gender:document.querySelector("#gender").value,
        contactNumber:document.querySelector("#contactNumber").value
    }

    if(!patient.username.trim() || !patient.dateOfBirth || !patient.gender.trim() || !patient.contactNumber.trim()){
        res.innerHTML = `<h2 class="failure">Patient cannot be added as fields are empty</h2>`;
        return;
    }

    let response = await fetch(baseUrl+"/add",{
        method:"POST",     
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(patient)
    })

    let result = await response.json();

    if(!response.ok){
        res.innerHTML = `<h2 class="failure">Patient was not added due to error</h2>`;
    }else{
        res.innerHTML = `<h2 class="success">Patient of name: ${patient.username} has been added</h2>`;
    }
})
}




//getting patient
const getAllBtn = document.querySelector("#getAllBtn");
const getIdBtn = document.querySelector("#getIdBtn");
let table = document.querySelector("#patientTable");

//all patients
if(getAllBtn != null){
getAllBtn.addEventListener("click", async(evt) => {
    evt.preventDefault();

    let response = await fetch(baseUrl+"/all");
    let result = await response.json();

    
    table.innerHTML = `<tr>
                            <th>Id</th>
                            <th>Username</th>
                            <th>Date of Birth</th>
                            <th>Gender</th>
                            <th>Contact Number</th>
                        </tr>`

    result.forEach(element => {        
        table.innerHTML += `<tr>
                                <td>${element.id}</td>
                                <td>${element.username}</td>
                                <td>${element.dateOfBirth}</td>
                                <td>${element.gender}</td>
                                <td>${element.contactNumber}</td>
                            </tr>`
    });
})
}


//by id
if(getIdBtn != null){
    getIdBtn.addEventListener("click" , async (evt) => {
        evt.preventDefault();
        
        const container = document.querySelector("#getContainer");
        container.innerHTML = `<input type="number" placeholder="Enter Patient Id" id="drId" 
                                        style : {padding:5px}> <br> <br>              
                                <button id="getPatientBtn">Search</button>`;

        const getPatientBtn = document.querySelector("#getPatientBtn");
        if(getPatientBtn != null){
            getPatientBtn.addEventListener("click" , async (evt) => {
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
                                        <th>Username</th>
                                        <th>Date of Birth</th>
                                        <th>Gender</th>
                                        <th>Contact Number</th>
                                    </tr>
                                    <tr>
                                        <td>${result.id}</td>
                                        <td>${result.username}</td>
                                        <td>${result.dateOfBirth}</td>
                                        <td>${result.gender}</td>
                                        <td>${result.contactNumber}</td>
                                    </tr>
                            </table>`;              
            })
        }
    })
}











//update patient
const validateBtn = document.querySelector("#checkUpdatePatientBtn");
if(validateBtn != null){
    validateBtn.addEventListener("click" , async (evt) => {
        evt.preventDefault();

        const patId = document.querySelector("#updatePatientId").value;
        const patName = document.querySelector("#updatePatientName").value;
        const updateContainer = document.querySelector("#updatePatientContainer");
        const updateRes = document.querySelector("#updateRes");

        //if input empty
        if(!patId || !patName.trim()){
            updateRes.innerHTML = `<h2 class="failure">Cannot Update Patient without entering Credentials</h2>`;
            return;
        }

        //if input not empty
        let response = await fetch(baseUrl+`/${patId}`);
        let result = await response.json();

        console.log(result.username);
        //if credentials dosen't match
        if(result.id != patId || result.username != patName){
            updateRes.innerHTML = `<h2 class="failure">Patient Id or Name is wrong! Please try again</h2>`;
            return;
        }

        //if valid credentials
        updateContainer.innerHTML = `<h3 class="success">Now Enter Details which you want to Update for Patient Id: ${patId}</h3>`;
        updateRes.innerHTML = `
        <form id="patientForm">
            <input type="text" placeholder="Username" id="name"><br>
            <input type="date" placeholder="Date of Birth" id="dob"><br>

            <label for="gender">Choose Gender:</label>
            <select name="gender" id="gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Trans Gender">Trans Gender</option>
            </select><br>

            <input type="number" placeholder="Contact Number" id="contactNo"><br>
            <button type="submit" id="addBtn">Update Patient</button>
        </form>`;

        //taking new input
        const addBtn = document.querySelector("#addBtn");
        if(addBtn != null){
        addBtn.addEventListener("click" , async (evt) => {
            evt.preventDefault();

            
            let updatedPatient = {
                id : patId,
                username : document.querySelector("#name").value,
                dateOfBirth : document.querySelector("#dob").value,
                gender : document.querySelector("#gender").value,
                contactNumber : document.querySelector("#contactNo").value
            }

            const finalMsg = document.querySelector("#finalMsg");

            //checking if null
            if(!updatedPatient.username.trim() || !updatedPatient.dateOfBirth || 
                !updatedPatient.gender.trim() || !updatedPatient.contactNumber){
       
                        finalMsg.innerHTML = `<h2 class="failure">Kindly Enter Details to update</h2>`;
                        return;
            }

            //send data if all clear
            let response = await fetch(baseUrl+`/update/${patId}`, {
                method : "PUT" , 
                headers : {"Content-Type":"application/json"} ,
                body : JSON.stringify(updatedPatient)
            })

            //checking if all is well sended
            //if error occured
            if(!response.ok){
                finalMsg.innerHTML = `<h2 class="failure">Error occured with status code: ${response.status} while updating Patient!</h2>`;
                return;
            }

            //if updated successfully
            finalMsg.innerHTML = `<h2 class="success">Patient has been updated Successfully :) </h2><br>`;

            finalMsg.innerHTML += `<h3 class="success">Check out Updated Patient here: </h3> 
                                    <a href="/html/getData/patient.html">Get Patient</a>`;
        })
        }
    })
}

















//delete patient
const deletePatientBtn = document.querySelector("#deletePatientBtn");
if(deletePatientBtn != null){
    deletePatientBtn.addEventListener("click" , async (evt) => {
        evt.preventDefault();

        
        const number = document.querySelector("#deletePatientId").value;
        const patientName = document.querySelector("#deletePatientName").value;

        const deleteRes = document.querySelector("#deleteRes");
        const finalMsg = document.querySelector("#deleteFinalMsg");


        //check if fields empty
        if(!number || !patientName.trim()){
            deleteRes.innerHTML = `<h2 class="failure">Kindly enter credentials first.</h2>`;
            return;
        }

        //if fields not empty
        let response = await fetch(baseUrl+`/${number}`);
        let result = await response.json();

        //if credentials dosen't match
        if(result.id != number || result.username != patientName){
            deleteRes.innerHTML = `<h2 class="failure">Invalid credentials , please try again</h2>`;
            return;
        }

        //if credentials match 
        //check confirmation
        deleteRes.innerHTML = `<h4 class="success">Enter this text :Delete -${result.username}</h4>
                               <input type="text" placeholder="Enter the above text" id="confirmation"><br>
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
                if(confirmation != `Delete -${result.username}`){
                    finalMsg.innerHTML = `<h2 class="failure">Entered text is invalid, try again carefully</h2>`;
                    return;
                }

                //if confirmation valid
                let response = await fetch(baseUrl+`/delete/${number}`,{
                    method : "DELETE",
                    headers:{"Content-Type":"application/json"}
                });

                //if error occurs
                if(!response.ok){
                    finalMsg.innerHTML = `<h2 class="failure">Error occured during deletion with status code: ${response.status}<br>
                                    The Patient you are trying to delete is being diagnos by doctors or in infirmary</h2>`;
                    return;
                }
                
                //if all clear
                finalMsg.innerHTML = `<h2 class="success">The Patient Record has been deleted successfully</h2>`;
            })
        }

    })
}
