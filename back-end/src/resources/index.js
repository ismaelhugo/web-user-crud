// importar todos os recursos aqui, para quando precisarmos usar, importar só a pasta em vez de todos os aquivos

import cpfValidation from './cpfValidation';
import birthdateValidation from './birthdateValidation';
import emailValidation from './emailValidation';
import phoneValidation from './phoneValidation';


const resources = {
  birthdateValidation: birthdateValidation,
  check_valid_email: emailValidation,
  phoneValidation: phoneValidation,
  cpfValidation: cpfValidation,
}

export default resources;