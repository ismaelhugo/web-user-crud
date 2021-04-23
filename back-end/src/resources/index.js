// importar todos os recursos aqui, para quando precisarmos usar, importar só a pasta em vez de todos os aquivos

import cpfValidation from './cpfValidation';
import cpfAlreadyExists from './cpfAlreadyExists';
import emailAlreadyExists from './emailAlreadyExists';
import birthdateValidation from './birthdateValidation';
import emailValidation from './emailValidation';
import passwordValidation from './passwordValidation';
import phoneValidation from './phoneValidation';


const resources = {
  birthdateValidation: birthdateValidation,
  check_valid_email: emailValidation,
  passwordValidation: passwordValidation,
  phoneValidation: phoneValidation,
  cpfValidation: cpfValidation,
  cpfAlreadyExists: cpfAlreadyExists,
  find_email: emailAlreadyExists,
}

export default resources;