// importar todos os recursos aqui, para quando precisarmos usar, importar só a pasta em vez de todos os aquivos

import cpfValidation from './cpfValidation';
import cpfAlreadyExists from './cpfAlreadyExists';
import birthdateValidation from './birthdateValidation';
import emailValidation from './emailValidation';
import passwordValidation from './passwordValidation';
import phoneValidation from './phoneValidation';


const resources = {
  birthdateValidation: birthdateValidation,
  emailValidation: emailValidation,
  passwordValidation: passwordValidation,
  phoneValidation: phoneValidation,
  cpfValidation: cpfValidation,
  cpfAlreadyExists: cpfAlreadyExists,
}

// const validation = {
//   email: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
  
//   //senha entre 4 e 20 dígitos, precisa ter pelo menos 1 letra min, 1 letra Mai, 1 número
//   senha: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,20}$/,

//   //numeroTelefone2: /^((?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579]))? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/,
//   numeroTelefone: (numeroTelefone) => /^\(?\d{2}\)? ?\d{4,5}-?\d{4}$/gi.test(numeroTelefone),


//   dataNascimento: /^\d{4}-\d{2}-\d{2}$/,

//   idadeMaxima: 120,
//   idadeMinima: 15,
// }


export default resources;