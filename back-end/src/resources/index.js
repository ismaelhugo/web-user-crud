// importar todos os recursos aqui, para quando precisarmos usar, importar só a pasta em vez de todos os aquivos

import cpfValidation from './cpfValidation';
import birthdateValidation from './birthdateValidation';
import emailValidation from './emailValidation';
import phoneValidation from './phoneValidation';

import generateAccessToken from './generateAccessToken';
import authenticateToken from './authenticateToken';


const resources = {
  birthdateValidation: birthdateValidation,
  emailValidation: emailValidation,
  phoneValidation: phoneValidation,
  cpfValidation: cpfValidation,

  generateAccessToken: generateAccessToken,
  authenticateToken: authenticateToken
}

export default resources;