function createUser() {

    let user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        cpf: document.getElementById("cpf").value,
        birthdate: document.getElementById("birthdate").value,
        password: document.getElementById("password").value,
        passwordConfirm: document.getElementById("passwordConfirm").value
    }

    if (!user.name || !user.email || !user.password || !user.phone || !user.birthdate || !user.cpf) {
        alert("Todos os campos sao obrigatorios")
    } else {

        const validPass = vPassword(user.password, user.passwordConfirm)
        const validEmail = vEmail(user.email)
        const validCPF = vCPF(user.cpf)
        const validPhone = vPhone(user.phone)
        const validName = vName(user.name)
        const validBirth = vBirth(user.birthdate)

        if (!validPass) {
            alert("As senhas nao correspondem")
        }
        else if (user.password.length < 5) {
            alert("A senha informada tem menos que 5 caracteres")
        }
        else if (!validEmail) {
            alert("O email informado n eh valido")
        }
        else if (!validCPF) {
            alert("O CPF informado n eh valido")
        }
        else if (!validPhone) {
            alert("O telefone informado n eh valido")
        }
        else if(!validName){
            alert("O nome nao é valido. Digite um nome com menos de 50 caracteres")
        }
        else if(!validBirth){
            alert("A data de nascimento n eh valida")
        }
        else{
            let ajax = new XMLHttpRequest();
            let baseURL = "http://localhost:3000"
        
            let userJson = JSON.stringify(user)
        
            ajax.open("POST", baseURL + `/cadastrar`)
            ajax.setRequestHeader("Content-Type", "application/json");
            ajax.send(userJson);
        
            ajax.onreadystatechange = function () {
        
                if (ajax.readyState == 4) {
                    if(ajax.status == 201){
                        var data = ajax.responseText;
                        alert("Cadastrado com sucesso")
                         window.location.href = "http://127.0.0.1:5500/front-end/src/templates/login.html"
                    }
                    else if(ajax.status == 400){
                        alert(ajax.responseText)
                    }
                    else if(ajax.status == 500){
                        alert(ajax.responseText)
                    }
                }
            }
        
            console.log(user)
        }
    }


}

function vName(name){
    if(name.length < 50){
        return true
    }
}

function vPassword(password, passwordConfirm) {
    if (password === passwordConfirm) {
        return true
    }
}

function vEmail(email) {
    const expression = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/

    let valid = expression.test(email)
    return valid;
}

function vPhone(phone){
    //Telefone pode ter 8 e 9 digitos
    if(phone.length > 9 && phone.length < 12){
        return true
    }
}

function vCPF(cpf) {
    if (typeof cpf !== "string") return false
    cpf = cpf.replace(/[\s.-]*/igm, '')
    if (
        !cpf ||
        cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999" 
    ) {
        return false
    }
    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++) 
        soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(9, 10)) ) return false
    soma = 0
    for (var i = 1; i <= 10; i++) 
        soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(10, 11) ) ) return false
    return true
}

function vBirth(birthdate){
        let arr = birthdate.split('/');
    
        let currentYear = parseInt(new Date().getFullYear())    
    
        if (!(currentYear == arr[2]) && !(currentYear - arr[2] > 110)) {
          let newBirthdate = `${arr[2]}-${arr[1]}-${arr[0]}`;
          return newBirthdate;
        }
    
        return false;
}

function clean() {
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('phone').value = "";
    document.getElementById('cpf').value = "";
    document.getElementById('birthdate').value = "";
    document.getElementById('password').value = "";
    document.getElementById('passwordConfirm').value = "";
}

function mask(val) {

    if(val.value.length === 2 || val.value.length === 5){
        val.value+="/"
        return true
    }
}