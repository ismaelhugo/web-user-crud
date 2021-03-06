window.onload = getSession;

const ajax = new XMLHttpRequest();
const baseURL = "http://localhost:3000"

function updateProfile() {
  let user = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    cpf: document.getElementById("cpf").value,
    birthdate: document.getElementById("birthdate").value,
  }

  let update = {
    name: null,
    email: null,
    phone: null,
    cpf: null,
    birthdate: null,
    userID: null
  }

  // todos vazios
  if(
    !(user.name && user.name != null && typeof user.name != undefined && user.name != '') &&
    !(user.email && user.email != null && typeof user.email != undefined && user.email != '') &&
    !(user.phone && user.phone != null && typeof user.phone != undefined && user.phone != '') &&
    !(user.cpf && user.cpf != null && typeof user.cpf != undefined && user.cpf != '') &&
    !(user.birthdate && user.birthdate != null && typeof user.birthdate != undefined && user.birthdate != '') 
  ) {
    return alert('Preencha pelo menos 1 campo');
  }


  if (user.name && user.name != null && typeof user.name != undefined && user.name != '') {
    const validName = vName(user.name);

    if (!validName) {
      return alert('Nome inváldo');
    } else {
      update.name = user.name;
    }
  }

  if (user.email && user.email != null && typeof user.email != undefined && user.email != '') {
    const validEmail = vEmail(user.email);

    if (!validEmail) {
      return alert('Email inváldo');
    } else {
      update.email = user.email;
    }
  }

  if (user.phone && user.phone != null && typeof user.phone != undefined && user.phone != '') {
    const validPhone = vPhone(user.phone);

    if (!validPhone) {
      return alert('Telefone inváldo');
    } else {
      update.phone = user.phone;
    }
  }

  if (user.cpf && user.cpf != null && typeof user.cpf != undefined && user.cpf != '') {
    cpf = user.cpf.toString().replace(/[^\d]+/g, '');

    const validCPF = vCPF(cpf);

    if (!validCPF) {
      return alert('CPF inváldo');
    } else {
      update.cpf = cpf;
    }
  }

  if (user.birthdate && user.birthdate != null && typeof user.birthdate != undefined && user.birthdate != '') {
    const validBirth = vBirth(user.birthdate);

    if (!validBirth) {
      return alert('Data de Nascimento inválda');
    } else {
      update.birthdate = validBirth;
    }
  }

  const userID = sessionStorage.getItem("UserID");

  ajax.open("PATCH", baseURL + `/editar-perfil/${userID}`, true)

  ajax.setRequestHeader("Content-Type", "application/json");

  const token = sessionStorage.getItem("Token");
  ajax.setRequestHeader("authorization", token);

  const newInfo = JSON.stringify(update)
  ajax.send(newInfo);

  ajax.onreadystatechange = function () {
    if (ajax.readyState == 4) {
      if (ajax.status == 200) {
        var data = ajax.responseText;
        alert("Atualizado com sucesso!")
        window.location.href = "http://127.0.0.1:5500/front-end/src/templates/main.html"
      }
      else if (ajax.status == 400) {
        alert(ajax.responseText)
      }
      else if (ajax.status == 500) {
        alert(ajax.responseText)
      }
    }
  }
}

function updatePassword() {
  let newPw = {
    pw: document.getElementById("password").value,
    pwConfirm: document.getElementById("passwordConfirm").value,
  }

  if (
    (newPw.pw && newPw.pw != null && typeof newPw.pw != undefined && newPw.pw != '') &&
    (newPw.pwConfirm && newPw.pwConfirm != null && typeof newPw.pwConfirm != undefined && newPw.pwConfirm != '')
  ) {
    const validPassword = vPassword(newPw.pw, newPw.pwConfirm);

    if (!validPassword) {
      return alert('Senha inválda');
    } else {
      // senha válida
      const userID = sessionStorage.getItem("UserID");

      ajax.open("PATCH", baseURL + `/atualizar-senha/${userID}`, true)

      ajax.setRequestHeader("Content-Type", "application/json");

      const token = sessionStorage.getItem("Token");
      ajax.setRequestHeader("authorization", token);

      const newPassword = JSON.stringify(newPw)
      ajax.send(newPassword);

      ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
          if (ajax.status == 200) {
            var data = ajax.responseText;
            alert("Atualizado com sucesso!")
            window.location.href = "http://127.0.0.1:5500/front-end/src/templates/main.html"
          }
          else if (ajax.status == 400) {
            alert(ajax.responseText)
          }
          else if (ajax.status == 500) {
            alert(ajax.responseText)
          }
        }
      }
    }

  } else {
    return alert('Preencha todos os campos');
  }
}

function deleteUser() {
  let id = sessionStorage.getItem("UserID")
  let token = sessionStorage.getItem("Token")

  ajax.open("DELETE", baseURL + `/delete/${id}`, true)
  ajax.setRequestHeader("Content-Type", "application/json");
  ajax.setRequestHeader("Authorization", token);

  ajax.send();
  ajax.onreadystatechange = function () {
    if (ajax.readyState == 4) {
      if (ajax.status == 200) {
        var data = ajax.responseText;

        sessionStorage.removeItem("Token")
        sessionStorage.removeItem("UserID")
        window.location.href = "http://127.0.0.1:5500/front-end/src/templates/login.html"
      } else {
        alert(ajax.responseText)
      }
    }
  }
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

//Validações
function vName(name) {
  if (name.length < 50) {
    return true
  }
}

function vPassword(password, passwordConfirm) {
  if (password.length >= 5 && password === passwordConfirm) {
    return true
  }
}

function vEmail(email) {
  const expression = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/

  let valid = expression.test(email)
  return valid;
}

function vPhone(phone) {
  //Telefone pode ter 8 e 9 digitos
  if (phone.length > 9 && phone.length < 12) {
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
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
  resto = (soma * 10) % 11
  if ((resto == 10) || (resto == 11)) resto = 0
  if (resto != parseInt(cpf.substring(9, 10))) return false
  soma = 0
  for (var i = 1; i <= 10; i++)
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
  resto = (soma * 10) % 11
  if ((resto == 10) || (resto == 11)) resto = 0
  if (resto != parseInt(cpf.substring(10, 11))) return false
  return true
}

function vBirth(birthdate) {
  let arr = birthdate.split('/');

  let currentYear = parseInt(new Date().getFullYear())

  if (!(currentYear == arr[2]) && !(currentYear - arr[2] > 110)) {
    let newBirthdate = `${arr[2]}-${arr[1]}-${arr[0]}`;
    return newBirthdate;
  }

  return false;
}

function getSession() {
  if (!sessionStorage.getItem("Token")) {
      window.location.href = "http://127.0.0.1:5500/front-end/src/templates/login.html"
  }
}