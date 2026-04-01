const baseUrl = "http://localhost:2000/api/facility";

//utility
//method to fetch url endpoint and gets response
const getResponse = async (url , methOd , object)=>{
    return response = await fetch(url , {
        method : `${methOd}`,
        headers : {"Content-Type":"application/json"},
        body : JSON.stringify(object)
    })
}

//method to fetch url endpoint and gets response
const deleteResponse = (url)=>{
    return response = fetch(url , {
        method : "DELETE",
        headers : {"Content-Type":"application/json"}
    })
}

//method to check input value is not empty
const isEmpty = (...input) => {
    input.forEach(element => {
        if(element.trim()){
            return true;
        }
    });
    return false;
}



//adding facility to database
const addBtn = document.querySelector("#addBtn");
let addRes = document.querySelector("#addRes");

if(addBtn != null){
addBtn.addEventListener("click" , async (evt)=>{
    evt.preventDefault();

    let facility = {
        name : document.querySelector("#name").value,
        type : document.querySelector("#type").value,
        address : document.querySelector("#location").value
    }

    if(!facility.name.trim() || !facility.type.trim() || !facility.address.trim()){
        addRes.innerHTML = `<h2 class="failure">Facility cannot be added as fields are empty</h2>`;
        return;
    }
    // if(isEmpty(facility.name , facility.type , facility.address)){
    //      addRes.innerHTML = `<h2 class="failure">Facility cannot be added as fields are empty</h2>`;
    //      return;
    // }

    let response = await fetch(baseUrl+"/add" , {
        method:"POST", 
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(facility)
    })

    // let response = getResponse(baseUrl+"/add" , "POST" , facility);

    if(!response.ok){
        addRes.innerHTML = `<h2 class="failure">Error has occurred with status code: ${response.status}</h2>`;
        return;
    }
    addRes.innerHTML = `<h2 class="success">Facility by name: ${facility.name} has been added</h2>`;
})
}










//getting facility
const getAllBtn = document.querySelector("#getAllBtn");
const getIdBtn = document.querySelector("#getIdBtn");
let table = document.querySelector("#facilityTable");

//all Facilities
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
        container.innerHTML = `<input type="number" placeholder="Enter Facility Id" id="drId" 
                                        style : {padding:5px}> <br> <br>              
                                <button id="getFacilityBtn">Search</button>`;

        const getFacilityBtn = document.querySelector("#getFacilityBtn");
        if(getFacilityBtn != null){
            getFacilityBtn.addEventListener("click" , async (evt) => {
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











//update facility
//update = get by id + add new (get + post)
const validateBtn = document.querySelector("#checkUpdateFacilityBtn");
if(validateBtn != null){
    validateBtn.addEventListener("click" , async (evt) => {
        evt.preventDefault();

        const facId = document.querySelector("#updateFacilityId").value;
        const facName = document.querySelector("#updateFacilityName").value;
        const updateContainer = document.querySelector("#updateFacilityContainer");
        const updateRes = document.querySelector("#updateRes");

        //if input empty
        if(!facId || !facName.trim()){
            updateRes.innerHTML = `<h2 class="failure">Cannot Update Facility without entering Credentials</h2>`;
            return;
        }

        //if input not empty
        let response = await fetch(baseUrl+`/${facId}`);
        let result = await response.json();

        //if credentials dosen't match
        if(result.id != facId || result.name != facName){
            updateRes.innerHTML = `<h2 class="failure">Facility Id or Name is wrong! Please try again</h2>`;
            return;
        }

        //if valid credentials
        updateContainer.innerHTML = `<h3 class="success">Now Enter Details which you want to Update for Facility Id: ${facId}</h3>`;
        updateRes.innerHTML = `
        <form id="facilityForm">
            <input type="text" placeholder="Name" id="name"><br>
            <input type="text" placeholder="Type" id="type">
            <input type="text" placeholder="Location" id="location"><br>
            <button type="submit" id="addBtn">Update Facility</button>
        </form>`;

        //taking new input
        const addBtn = document.querySelector("#addBtn");
        if(addBtn != null){
        addBtn.addEventListener("click" , async (evt) => {
            evt.preventDefault();

            
            let updatedFacility = {
                id : facId,
                name : document.querySelector("#name").value,
                type : document.querySelector("#type").value,
                address : document.querySelector("#location").value
            }

            const finalMsg = document.querySelector("#finalMsg");

            //checking if null
            if(!updatedFacility.name.trim() || !updatedFacility.type.trim() || 
                    !updatedFacility.address.trim()){
       
                        finalMsg.innerHTML = `<h2 class="failure">Kindly Enter Details to update</h2>`;
                        return;
            }

            //update data if all clear
            let response = await fetch(baseUrl+`/update/${facId}` , {
                method : "PUT" , 
                headers : {"Content-Type":"application/json"} ,
                body : JSON.stringify(updatedFacility)
            })

            //checking if all is well sended
            //if error occured
            if(!response.ok){
                finalMsg.innerHTML = `<h2 class="failure">Error occured with status code: ${response.status} while updating Facility!</h2>`;
                return;
            }

            //if updated successfully
            finalMsg.innerHTML = `<h2 class="success">Facility has been updated Successfully :) </h2><br>`;

            finalMsg.innerHTML += `<h3 class="success">Check out Updated Facility here: </h3> 
                                    <a href="/html/getData/facility.html">Get Facility</a>`;
        })
        }
    })
}
















//delete Facility
const deleteFacilityBtn = document.querySelector("#deleteFacilityBtn");
if(deleteFacilityBtn != null){
    deleteFacilityBtn.addEventListener("click" , async (evt) => {
        evt.preventDefault();

        
        const number = document.querySelector("#deleteFacilityId").value;
        const facilityName = document.querySelector("#deleteFacilityName").value;

        const deleteRes = document.querySelector("#deleteRes");
        const finalMsg = document.querySelector("#deleteFinalMsg");


        //check if fields empty
        if(!number || !facilityName.trim()){
            deleteRes.innerHTML = `<h2 class="failure">Kindly enter credentials first.</h2>`;
            return;
        }

        //if fields not empty
        let response = await fetch(baseUrl+`/${number}`);
        let result = await response.json();

        //if credentials dosen't match
        if(result.id != number || result.name != facilityName){
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
                                    The Facility you are trying to delete is being used by patients or doctors</h2>`;
                    return;
                }
                
                //if all clear
                finalMsg.innerHTML = `<h2 class="success">The Facility Record has been deleted successfully</h2>`;
            })
        }
    })
}
