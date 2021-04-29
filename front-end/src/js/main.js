window.onload = getSession;

function getUsersByName(inputID) {
    let name = document.getElementById(inputID).value;
    let lista = document.querySelector(".list")

    console.log(name)

    if (!name || name == "") {
        name = 'all'
    }

    lista.innerHTML = ""

    let ajax = new XMLHttpRequest();
    let baseURL = "http://localhost:3000"

    ajax.responseType = "json"

    ajax.open("GET", baseURL + `/listar-usuarios/${name}`, true)

    ajax.send();

    ajax.onreadystatechange = function () {

        if (ajax.readyState == 4) {
            if (ajax.status == 200) {
                var data = ajax.response;
                console.log(data)
                for (var i = 0; i < data.length; i++) {
                    lista.innerHTML += "<li>"
                        + "<p>"
                        + data[i].nome
                        + "</p>"
                        + "<p>"
                        + data[i].email
                        + "</p>"
                        + "<p>"
                        + data[i].idade
                        + "</p>"
                        + "</li>"
                }
            }
            if (ajax.status == 400){
                lista.innerHTML += "<h2>Nenhum usuario encontrado</h2>"
            }
        }
    }
}

function logout() {
    sessionStorage.removeItem("UserID");
    sessionStorage.removeItem("Token");
    window.location.href = 'http://127.0.0.1:5500/front-end/src/templates/login.html'
}

function getSession() {
    if (!sessionStorage.getItem("Token")) {
        window.location.href = "http://127.0.0.1:5500/front-end/src/templates/login.html"
    }
}