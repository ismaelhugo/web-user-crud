window.onload = getSession;

function login() {
    let user = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }

    if (user.email && user.password) {
        let ajax = new XMLHttpRequest();
        let baseURL = "http://localhost:3000";

        let userJson = JSON.stringify(user);

        ajax.open("POST", baseURL + `/login`);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(userJson);

        ajax.onreadystatechange = function () {

            if (ajax.readyState == 4) {
                if(ajax.status == 200){
                    var data = ajax.responseText;
                    let dataJson = JSON.parse(data);
    
                    sessionStorage.setItem("UserID", dataJson.id);
    
                    sessionStorage.setItem("Token", dataJson.token);
    
                    window.location.href = "http://127.0.0.1:5500/front-end/src/templates/main.html"
                }
                else if(ajax.status == 400){
                    alert("Nenhum usuario com essas credenciais")
                }
                else if(ajax.status == 500){
                    alert("Erro no server. Tente mais tarde")
                }
            }
        }
    } else {
        alert("E-mail e senha são campos obrigatórios.")
    }
}

function getSession() {
    if (sessionStorage.getItem("Token")) {
        window.location.href = "http://127.0.0.1:5500/front-end/src/templates/main.html"
    }
}