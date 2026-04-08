import { isValidName } from "./utility.js";
const baseUrl = "/api/healthcareCenter";


//adding healthcareCenter to database
const addBtn = document.querySelector("#addBtn");
const addRes = document.querySelector("#addRes");

if(addBtn != null){
addBtn.addEventListener("click" , async (evt)=>{
    evt.preventDefault();

    let healthcareCenter = {
        name : document.querySelector("#name").value,
        type : document.querySelector("#healthCareType").value,
        address : document.querySelector("#location").value
    }

    if(!healthcareCenter.name.trim() || !healthcareCenter.type.trim() || !healthcareCenter.address.trim()){
        addRes.innerHTML = `<h2 class="failure">HealthcareCenter cannot be added as fields are empty</h2>`;
        return;
    }else if(!isValidName(healthcareCenter.name)){
        addRes.innerHTML = `<h2 class="failure">Name should not contain numbers or special characters</h2>`;
        return;
    }

    let response = await fetch(baseUrl+"/add" , {
        method:"POST", 
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(healthcareCenter)
    })

    if(!response.ok){
        addRes.innerHTML = `<h2 class="failure">Error has occurred with status code: ${response.status}</h2>`;
        return;
    }
    addRes.innerHTML = `<h2 class="success">HealthcareCenter by name: ${healthcareCenter.name} has been added</h2>`;
})
}










//getting healthcareCenter
const getAllBtn = document.querySelector("#getAllBtn");
const getIdBtn = document.querySelector("#getIdBtn");
let table = document.querySelector("#healthcareCenterTable");

//all Healthcare centers
if(getAllBtn != null){
getAllBtn.addEventListener("click", async(evt) => {
    evt.preventDefault();

    let response = await fetch(baseUrl+"/all");
    let result = await response.json();

    
    table.innerHTML = `<tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Address Id</th>
                        </tr>`

    result.forEach(element => {        
        table.innerHTML += `<tr>
                                <td>${element.id}</td>
                                <td>${element.name}</td>
                                <td>${element.type}</td>
                                <td>${element.address}</td>
                            </tr>`
    });
})
}


//by id
if(getIdBtn != null){
    getIdBtn.addEventListener("click" , async (evt) => {
        evt.preventDefault();
        
        const container = document.querySelector("#getContainer");
        container.innerHTML = `<input type="number" placeholder="Enter HealthcareCenter Id" id="drId" 
                                        style : {padding:5px}> <br> <br>              
                                <button id="getHealthcareCenterBtn">Search</button>`;

        const getHealthcareCenterBtn = document.querySelector("#getHealthcareCenterBtn");
        if(getHealthcareCenterBtn != null){
            getHealthcareCenterBtn.addEventListener("click" , async (evt) => {
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
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Address</th>
                                    </tr>
                                    <tr>
                                        <td>${result.id}</td>
                                        <td>${result.name}</td>
                                        <td>${result.type}</td>
                                        <td>${result.address}</td>
                                    </tr>
                            </table>`;              
            })
        }
    })
}











//update healthcareCenter
//update = get by id + add new (get + post)
const validateBtn = document.querySelector("#checkUpdateHealthcareCenterBtn");
if(validateBtn != null){
    validateBtn.addEventListener("click" , async (evt) => {
        evt.preventDefault();

        const centerId = document.querySelector("#updateHealthcareCenterId").value;
        const centerName = document.querySelector("#updateHealthcareCenterName").value;
        const updateContainer = document.querySelector("#updateHealthcareCenterContainer");
        const updateRes = document.querySelector("#updateRes");

        //if input empty
        if(!centerId || !centerName.trim()){
            updateRes.innerHTML = `<h2 class="failure">Cannot Update HealthcareCenter without entering Credentials</h2>`;
            return;
        }

        //if input not empty
        let response = await fetch(baseUrl+`/${centerId}`);
        let result = await response.json();

        //if credentials dosen't match
        if(result.id != centerId || result.name != centerName){
            updateRes.innerHTML = `<h2 class="failure">HealthcareCenter Id or Name is wrong! Please try again</h2>`;
            return;
        }

        //if valid credentials
        updateContainer.innerHTML = `<h3 class="success">Now Enter Details which you want to Update for HealthcareCenter Id: ${centerId}</h3>`;
        updateRes.innerHTML = `
        <form id="healthcareCenterForm">
            <input type="text" placeholder="Name" id="name"><br>

            <div class="labelBox">
            <label for="type">Type:</label>
            <select name="type" id="healthCareType">
                <option value="Hospital">Hospital</option>
                <option value="Clinic">Clinic</option>
                <option value="Diagnostic Center">Diagnostic Center</option>
                <option value="Medical College">Medical College</option>
            </select>
            </div>
            
            <input type="text" placeholder="Location" id="location"><br>
            <button type="submit" id="addBtn">Update HealthcareCenter</button>
        </form>`;

        //taking new input
        const addBtn = document.querySelector("#addBtn");
        if(addBtn != null){
        addBtn.addEventListener("click" , async (evt) => {
            evt.preventDefault();

            
            let updatedHealthcareCenter = {
                id : centerId,
                name : document.querySelector("#name").value,
                type : document.querySelector("#healthCareType").value,
                address : document.querySelector("#location").value
            }

            const finalMsg = document.querySelector("#finalMsg");

            //checking if null
            if(!updatedHealthcareCenter.name.trim() || !updatedHealthcareCenter.type.trim() || 
                    !updatedHealthcareCenter.address.trim()){
       
                        finalMsg.innerHTML = `<h2 class="failure">Kindly Enter Details to update</h2>`;
                        return;
            }else if(!isValidName(updatedHealthcareCenter.name)){
                    finalMsg.innerHTML = `<h2 class="failure">Name should not contain numbers or special characters</h2>`;
                    return;                
            }

            //update data if all clear
            let response = await fetch(baseUrl+`/update/${centerId}` , {
                method : "PUT" , 
                headers : {"Content-Type":"application/json"} ,
                body : JSON.stringify(updatedHealthcareCenter)
            })

            //checking if all is well sended
            //if error occured
            if(!response.ok){
                finalMsg.innerHTML = `<h2 class="failure">Error occured with status code: ${response.status} while updating HealthcareCenter!</h2>`;
                return;
            }

            //if updated successfully
            finalMsg.innerHTML = `<h2 class="success">HealthcareCenter has been updated Successfully :) </h2><br>`;

            finalMsg.innerHTML += `<h3 class="success">Check out Updated HealthcareCenter here: </h3> 
                                    <a href="/html/getData/healthcareCenter.html">Get HealthcareCenter</a>`;
        })
        }
    })
}
















//delete HealthcareCenter
const deleteHealthcareCenterBtn = document.querySelector("#deleteHealthcareCenterBtn");
if(deleteHealthcareCenterBtn != null){
    deleteHealthcareCenterBtn.addEventListener("click" , async (evt) => {
        evt.preventDefault();

        
        const number = document.querySelector("#deleteHealthcareCenterId").value;
        const healthcareCenterName = document.querySelector("#deleteHealthcareCenterName").value;

        const deleteRes = document.querySelector("#deleteRes");
        const finalMsg = document.querySelector("#deleteFinalMsg");


        //check if fields empty
        if(!number || !healthcareCenterName.trim()){
            deleteRes.innerHTML = `<h2 class="failure">Kindly enter credentials first.</h2>`;
            return;
        }

        //if fields not empty
        let response = await fetch(baseUrl+`/${number}`);
        let result = await response.json();

        //if credentials dosen't match
        if(result.id != number || result.name != healthcareCenterName){
            deleteRes.innerHTML = `<h2 class="failure">Invalid credentials , please try again</h2>`;
            return;
        }

        //if credentials match 
        //check confirmation
        deleteRes.innerHTML = `<h4 class="success">Enter this text :Delete -${result.name}</h4>
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
                if(confirmation != `Delete -${result.name}`){
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
                                    The HealthcareCenter you are trying to delete is being used by patients or doctors</h2>`;
                    return;
                }
                
                //if all clear
                finalMsg.innerHTML = `<h2 class="success">The HealthcareCenter Record has been deleted successfully</h2>`;
            })
        }
    })
}
