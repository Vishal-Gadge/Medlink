const URL = "http://localhost:2000/api";

const div = document.querySelector(".result");

( async() => {
    let response = await fetch(URL+"/patient/all");
    console.log(response);
    let result = await response.json();
    console.log(result[0].username);

    div.innerHTML=`<h1>Name is: ${result[0].username}</h1>`;
}
)();
