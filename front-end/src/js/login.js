window.onload = getSession;

function login() {
    let user = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }

    if (user.email && user.password) {
        let ajax = new XMLHttpRequest();
        let baseURL = "http://localhost:3000"

        let userJson = JSON.stringify(user)

        ajax.open("POST", baseURL + `/login`)
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(userJson);

        ajax.onreadystatechange = function () {

            if (ajax.readyState == 4 && ajax.status == 200) {

                var data = ajax.responseText;

                sessionStorage.setItem("User", data)
                console.log(sessionStorage.getItem("User"))
                window.location.href = "http://127.0.0.1:5500/front-end/src/templates/main.html"
            }
        }
    } else{
        alert("E-mail e senha são campos obrigatórios.")
    }
}

function getSession() {
    if (sessionStorage.getItem("User")) {
        window.location.href = "http://127.0.0.1:5500/front-end/src/templates/main.html"
    }
}