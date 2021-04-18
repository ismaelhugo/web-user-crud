/* Função para validar o telefone */

//expressão regular para o telefone
// ainda testando*
const validPhone = /^\(?\d{2}\)? ?\d{4,5}-?\d{4}$/gi

export default function phoneValidation(phone) {
  if (!phone || phone == '') {
    return new Error({
      message: 'Telefone inválido'
    });
  } else {
    phone = phone.toString().replace(/\D/g,'')
    return validPhone.test(phone)
  };
}