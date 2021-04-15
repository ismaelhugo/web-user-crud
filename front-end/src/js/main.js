function getUsers() {
    var ajax = new XMLHttpRequest();
    var baseURL = "http://localhost:3000"

    ajax.open("GET", baseURL+"/listar-usuarios", true);

    ajax.send();

    ajax.onreadystatechange = function () {

        if (ajax.readyState == 4 && ajax.status == 200) {

            var data = ajax.responseText;

            console.log(data);
        }
    }
}