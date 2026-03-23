const baseUrl = "http://localhost:2000/api/facility";

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
        addRes.innerHTML = `<h2>Facility cannot be added as fields are empty</h2>`;
        return;
    }

    let response = await fetch(baseUrl+"/add" , {
        method:"POST", 
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(facility)
    })

    if(response.status != 200){
        addRes.innerHTML = `<h2>Error has occurred with status code: ${response.status}</h2>`;
        return;
    }
    addRes.innerHTML = `<h2>Facility by name: ${facility.name} has been added</h2>`;
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
            updateRes.innerHTML = `<h2>Cannot Update Facility without entering Credentials</h2>`;
            return;
        }

        //if input not empty
        let response = await fetch(baseUrl+`/${facId}`);
        let result = await response.json();

        //if credentials dosen't match
        if(result.facilityId != facId || result.name != facName){
            updateRes.innerHTML = `<h2>Facility Id or Name is wrong! Please try again</h2>`;
            return;
        }

        //if valid credentials
        updateContainer.innerHTML = `<h3>Now Enter Details which you want to Update for Facility Id: ${facId}</h3>`;
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
                name : document.querySelector("#name").value,
                type : document.querySelector("#type").value,
                address : document.querySelector("#location").value
            }

            const finalMsg = document.querySelector("#finalMsg");

            //checking if null
            if(!updatedFacility.name.trim() || !updatedFacility.type.trim() || 
                    !updatedFacility.address.trim()){
       
                        finalMsg.innerHTML = `<h2>Kindly Enter Details to update</h2>`;
                        return;
            }

            //send data if all clear
            let response = await fetch(baseUrl+"/add" , {
                method : "POST" , 
                headers : {"Content-Type":"application/json"} ,
                body : JSON.stringify(updatedFacility)
            })

            //checking if all is well sended
            //if error occured
            if(response.status != 200){
                finalMsg.innerHTML = `<h2>Error occured with status code: ${response.status} while updating Facility!</h2>`;
                return;
            }

            //if updated successfully
            finalMsg.innerHTML = `<h2>Facility has been updated Successfully :) </h2><br>`;

            finalMsg.innerHTML += `<h3>Check out Updated Facility here: </h3> 
                                    <a href="/html/getData/facility.html">Get Facility</a>`;
        })
        }
    })
}
















//delete Facility
