//function to check name is valid or not (contain numbers or not)
let regex = /^[A-Za-z\s]+$/;
export function isValidName (name) {
    if(regex.test(name)){
        return true;
    }
    return false;
}