/* Função para validar a senha */

//expressão regular para senha
//senha entre 5 e 20 dígitos, precisa ter pelo menos 1 letra min, 1 letra Mai, 1 número
const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,20}$/

export default function passwordValidation(password) {
  if (!password || password == '') {
    return new Error({
      message: 'Senha inválida'
    });
  } else {
    return validPassword.test(password)
  };
}