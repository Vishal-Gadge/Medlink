const baseUrl = "http://localhost:2000/api/doctor";

//adding doctor to database
const addBtn = document.querySelector("#addBtn");
let addRes = document.querySelector("#addRes");

if(addBtn != null){
addBtn.addEventListener("click" , async (evt)=>{
    evt.preventDefault();

    let doctor = {
        name : document.querySelector("#name").value,
        username : document.querySelector("#username").value,
        password : document.querySelector("#password").value,
        role : document.querySelector("#role").value,
        facilityId : document.querySelector("#facilityId").value
    }

    if(!doctor.name.trim() || !doctor.username.trim() || !doctor.password || 
        !doctor.role.trim() || !doctor.facilityId){
        addRes.innerHTML = `<h2>Doctor cannot be added as fields are empty</h2>`;
        return;
    }

    let response = await fetch(baseUrl+"/add" , {
        method:"POST", 
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(doctor)
    })

    if(response.status != 200){
        addRes.innerHTML = `<h2>Error has occurred with status code: ${response.status}</h2>`;
        return;
    }
    addRes.innerHTML = `<h2>Doctor by name: ${doctor.name} has been added</h2>`;
})}




//getting doctor
const getAllBtn = document.querySelector("#getAllBtn");
const getIdBtn = document.querySelector("#getIdBtn");
let table = document.querySelector("#doctorTable");

//all doctors
if(getAllBtn != null){
getAllBtn.addEventListener("click", async(evt) => {
    evt.preventDefault();

    let response = await fetch(baseUrl+"/all");
    let result = await response.json();

    
    table.innerHTML = `<tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Facility Id</th>
                        </tr>`

    result.forEach(element => {        
        table.innerHTML += `<tr>
                                <td>${element.id}</td>
                                <td>${element.name}</td>
                                <td>${element.role}</td>
                                <td>${element.facilityId}</td>
                            </tr>`
    });
})
}


//by id
if(getIdBtn != null){
    getIdBtn.addEventListener("click" , async (evt) => {
        evt.preventDefault();
        
        const container = document.querySelector("#getContainer");
        container.innerHTML = `<input type="number" placeholder="Enter doctor Id" id="drId" 
                                        style : {padding:5px}> <br> <br>              
                                <button id="getDoctorBtn">Search</button>`;

        const getDoctorBtn = document.querySelector("#getDoctorBtn");
        if(getDoctorBtn != null){
            getDoctorBtn.addEventListener("click" , async (evt) => {
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
                                        <th>Role</th>
                                        <th>Facility Id</th>
                                    </tr>
                                    <tr>
                                        <td>${result.id}</td>
                                        <td>${result.name}</td>
                                        <td>${result.role}</td>
                                        <td>${result.facilityId}</td>
                                    </tr>
                            </table>`;              
            })
        }
    })
}






//update doctor
const validateBtn = document.querySelector("#checkUpdateDoctorBtn");
if(validateBtn != null){
    validateBtn.addEventListener("click" , async (evt) => {
        evt.preventDefault();

        const  docId = document.querySelector("#updateDoctorId").value;
        const  docName= document.querySelector("#updateDoctorUsername").value;
        const  docPass= document.querySelector("#updateDoctorPass").value;
        const updateContainer = document.querySelector("#updateDoctorContainer");
        const updateRes = document.querySelector("#updateRes");

        //if input empty
        if(!docId || !docPass || !docName.trim()){
            updateRes.innerHTML = `<h2>Cannot Update Doctor without entering Credentials</h2>`;
            return;
        }

        //if input not empty
        let response = await fetch(baseUrl+`/${docId}`);
        let result = await response.json();

        //if credentials dosen't match
        if(result.id != docId || result.password !== docPass || result.username !== docName){
            updateRes.innerHTML = `<h2>Doctor Id , Username or Password is wrong! Please try again</h2>`;
            return;
        }

        //if valid credentials
        updateContainer.innerHTML = `<h3>Now Enter Details which you want to Update for Doctor Username: ${docName}</h3>`;
        updateRes.innerHTML = `
        <form id="doctorForm">
            <input type="text" placeholder="Name" id="name"><br>
            <input type="text" placeholder="Username" id="username"><br>
            <input type="text" placeholder="Password" id="password"><br>
            <input type="text" placeholder="Role" id="role"><br>
            <input type="number" placeholder="Facility Id" id="facilityId"><br>
            <button type="submit" id="addBtn">Update Doctor</button>
        </form>`;

        //taking new input
        const addBtn = document.querySelector("#addBtn");
        if(addBtn != null){
        addBtn.addEventListener("click" , async (evt) => {
            evt.preventDefault();

            
            let updatedDoctor = {
                name : document.querySelector("#name").value,
                username : document.querySelector("#username").value,
                password : document.querySelector("#password").value,
                role : document.querySelector("#role").value,
                facilityId : document.querySelector("#facilityId").value
            }

            const finalMsg = document.querySelector("#finalMsg");

            //checking if null
            if(!updatedDoctor.name.trim() || !updatedDoctor.username.trim() || !updatedDoctor.password || 
                !updatedDoctor.role.trim() || !updatedDoctor.facilityId){
       
                        finalMsg.innerHTML = `<h2>Kindly Enter Details to update</h2>`;
                        return;
            }

            //send data if all clear
            let response = await fetch(baseUrl+"/add" , {
                method : "POST" , 
                headers : {"Content-Type":"application/json"} ,
                body : JSON.stringify(updatedDoctor)
            })

            //checking if all is well sended
            //if error occured
            if(response.status != 200){
                finalMsg.innerHTML = `<h2>Error occured with status code: ${response.status} while updating Doctor!</h2>`;
                return;
            }

            //if updated successfully
            finalMsg.innerHTML = `<h2>Doctor has been updated Successfully :) </h2><br>`;

            finalMsg.innerHTML += `<h3>Check out Updated Doctor here: </h3> 
                                    <a href="/html/getData/doctor.html">Get Doctor</a>`;
        })
        }
    })
}













//delete doctor
const deleteDoctorBtn = document.querySelector("#deleteDoctorBtn");
if(deleteDoctorBtn != null){
    deleteDoctorBtn.addEventListener("click" , async (evt) => {
        evt.preventDefault();

        
        const number = document.querySelector("#deleteDoctorId").value;
        const doctorName = document.querySelector("#deleteDoctorName").value;
        const docPassword = document.querySelector("#deleteDoctorPass").value;

        const deleteRes = document.querySelector("#deleteRes");
        const finalMsg = document.querySelector("#deleteFinalMsg");


        //check if fields empty
        if(!number || !doctorName.trim() || !docPassword){
            deleteRes.innerHTML = `<h2>Kindly enter credentials first.</h2>`;
            return;
        }

        //if fields not empty
        let response = await fetch(baseUrl+`/${number}`);
        let result = await response.json();

        //if credentials dosen't match
        if(result.id != number || result.username != doctorName){
            deleteRes.innerHTML = `<h2>Invalid credentials , please try again</h2><br>`;
            return;
        }

        //if password is wrong
        if(result.password != docPassword){
            deleteRes.innerHTML += `<h2>Invalid Password , please try again</h2>`;
            return;
        }

        //if credentials match 
        //check confirmation
        deleteRes.innerHTML = `<h4>Enter this text for confirmation :Delete -${result.username}</h4>
                               <input type="text" placeholder="Enter the confirmation text" id="confirmation"><br>
                               <button type="submit" id="confirmBtn">Confirm</button>`;

        const confirmBtn = document.querySelector("#confirmBtn");
        if(confirmBtn != null){
            confirmBtn.addEventListener("click" , async (evt) => {
                evt.preventDefault();
                
                const confirmation = document.querySelector("#confirmation").value;
                //if confirmation field empty
                if(!confirmation.trim()){
                    finalMsg.innerHTML = `<h2>Kindly enter the text</h2>`;
                    return;
                }

                //if confirmation invalid
                if(confirmation != `Delete -${result.username}`){
                    finalMsg.innerHTML = `<h2>Entered text is invalid, try again carefully</h2>`;
                    return;
                }

                //if confirmation valid
                let response = await fetch(baseUrl+`/delete/${number}`,{
                    method : "DELETE",
                    headers:{"Content-Type":"application/json"}
                });

                //if error occurs
                if(response.status != 200){
                    finalMsg.innerHTML = `<h2>Error occured during deletion with status code: ${response.status}<br>
                                    The Doctor you are trying to delete is trying to diagnos patients or is in referral</h2>`;
                    return;
                }
                
                //if all clear
                finalMsg.innerHTML = `<h2>The Doctor Record has been deleted successfully</h2>`;
            })
        }
    })
}
