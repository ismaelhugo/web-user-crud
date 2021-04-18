// function getUsers() {
//     var ajax = new XMLHttpRequest();
//     var baseURL = "http://localhost:3000"

//     ajax.open("GET", baseURL+"/listar-usuarios", true);

//     ajax.send();

//     ajax.onreadystatechange = function () {

//         if (ajax.readyState == 4 && ajax.status == 200) {

//             var data = ajax.responseText;

//             console.log(data);
//         }
//     }
// }

function getUsersByName(inputID) {
    let name = document.getElementById(inputID).value;

    if (!name || name == "") {
        name = 'all'
    }

    let ajax = new XMLHttpRequest();
    let baseURL = "http://localhost:3000"

    ajax.open("GET", baseURL+`/listar-usuarios/${name}`, true)

    ajax.send();

    ajax.onreadystatechange = function () {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var data = ajax.responseText;

            console.log(data);
        }
    }
}