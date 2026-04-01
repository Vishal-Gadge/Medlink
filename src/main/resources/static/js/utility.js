

//method to fetch url endpoint and gets response
const getResponse = (url , method , object)=>{
    return response = fetch(url , {
        method : `"${method}"`,
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
        if(element === "" || !element.trim()){
            return true;
        }
    });
    return false;
}


//