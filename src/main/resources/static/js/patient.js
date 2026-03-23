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
        res.innerHTML = `<h2>Patient cannot be added as fields are empty</h2>`;
    }else{
        let response = await fetch(baseUrl+"/add",{
            method:"POST",     
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(patient)
        })

        let result = await response.json();

        if(response.status != 200){
            res.innerHTML = `<h2>Patient was not added due to error</h2>`;
        }else{
            res.innerHTML = `<h2>Patient of name: ${patient.username} has been added</h2>`;
        }
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
                    getRes.innerHTML = `<h2>Kindly Enter Id first</h2>`;
                    return;
                }

                let response = await fetch(baseUrl + `/${drId}`);
                let result = await response.json();

                if(response.status != 200){
                    getRes.innerHTML = `<h3>Error occured with status code: ${response.status} 
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
            updateRes.innerHTML = `<h2>Cannot Update Patient without entering Credentials</h2>`;
            return;
        }

        //if input not empty
        let response = await fetch(baseUrl+`/${patId}`);
        let result = await response.json();

        console.log(result.username);
        //if credentials dosen't match
        if(result.id != patId || result.username != patName){
            updateRes.innerHTML = `<h2>Patient Id or Name is wrong! Please try again</h2>`;
            return;
        }

        //if valid credentials
        updateContainer.innerHTML = `<h3>Now Enter Details which you want to Update for Patient Id: ${patId}</h3>`;
        updateRes.innerHTML = `
        <form id="patientForm">
            <input type="text" placeholder="Username" id="name"><br>
            <input type="date" placeholder="Date of Birth" id="dob"><br>
            <input type="text" placeholder="Gender" id="gender"><br>
            <input type="number" placeholder="Contact Number" id="contactNo"><br>
            <button type="submit" id="addBtn">Update Patient</button>
        </form>`;

        //taking new input
        const addBtn = document.querySelector("#addBtn");
        if(addBtn != null){
        addBtn.addEventListener("click" , async (evt) => {
            evt.preventDefault();

            
            let updatedPatient = {
                username : document.querySelector("#name").value,
                dateOfBirth : document.querySelector("#dob").value,
                gender : document.querySelector("#gender").value,
                contactNumber : document.querySelector("#contactNo").value
            }

            const finalMsg = document.querySelector("#finalMsg");

            //checking if null
            if(!updatedPatient.username.trim() || !updatedPatient.dateOfBirth || 
                !updatedPatient.gender.trim() || !updatedPatient.contactNumber){
       
                        finalMsg.innerHTML = `<h2>Kindly Enter Details to update</h2>`;
                        return;
            }

            //send data if all clear
            let response = await fetch(baseUrl+"/add" , {
                method : "POST" , 
                headers : {"Content-Type":"application/json"} ,
                body : JSON.stringify(updatedPatient)
            })

            //checking if all is well sended
            //if error occured
            if(response.status != 200){
                finalMsg.innerHTML = `<h2>Error occured with status code: ${response.status} while updating Patient!</h2>`;
                return;
            }

            //if updated successfully
            finalMsg.innerHTML = `<h2>Patient has been updated Successfully :) </h2><br>`;

            finalMsg.innerHTML += `<h3>Check out Updated Patient here: </h3> 
                                    <a href="/html/getData/patient.html">Get Patient</a>`;
        })
        }
    })
}