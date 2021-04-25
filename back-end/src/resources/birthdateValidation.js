/* Função para validar a data de nascimento */

// const validForm = /^\d{4}-\d{2}-\d{2}$/

export default function BirthdateValidation(birthdate) {
  if (!birthdate || birthdate == '') {
    return new Error({
      message: 'Data de Nascimento inválida'
    });
  } else {
    let arr = birthdate.split('/');

    let currentYear = parseInt(new Date().getFullYear())    

    if (!(currentYear <= arr[2]) && !(currentYear - arr[2] > 110)) {
      let newBirthdate = `${arr[2]}-${arr[1]}-${arr[0]}`;
      return newBirthdate;
    }

    return false;
  };
}