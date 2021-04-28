function getUsersByName(inputID) {
    let name = document.getElementById(inputID).value;
    let lista = document.querySelector(".list")

    if (!name || name == "") {
        name = 'all'
    }

    lista.innerHTML = ""

    let ajax = new XMLHttpRequest();
    let baseURL = "http://localhost:3000"

    ajax.responseType = "json"

    ajax.open("GET", baseURL+`/listar-usuarios/${name}`, true)

    ajax.send();

    ajax.onreadystatechange = function () {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var data = ajax.response;
            console.log(data)
            if(data.length === 0){
                lista.innerHTML += "<h2>Nenhum usuario encontrado</h2>"
            }
            for(var i = 0; i < data.length; i++){
                lista.innerHTML += "<li>"
                +"<p>"
                +data[i].nome
                +"</p>"
                +"<p>"
                +data[i].email
                +"</p>"
                +"</li>"
            }
            
        }
    }
}

function logout(){
    sessionStorage.removeItem("User");
    window.location.href = 'http://127.0.0.1:5500/front-end/src/templates/login.html'
}

// function redirect(sessionToken, destination) {
//     if (!sessionToken) {
//         // usuário não logado
//     }
// }