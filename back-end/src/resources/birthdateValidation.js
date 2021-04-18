/* Função para validar a data de nascimento */

// não sei se essa está funcionando, pq peguei pronta de um outro projeto meu
// e tem que ver o formato do SQL

//expressão regular para o formato da data de nascimento (AAAA/MM/DD)
const validForm = /^\d{4}-\d{2}-\d{2}$/

export default function BirthdateValidation(birthdate) {
  if (!birthdate || birthdate == '') {
    return new Error({
      message: 'Data de Nascimento inválida'
    });
  } else {
    const ageLimit = {
      max: 110,
      min: 15
    }

    const date = new Date(birthdate);
    const year = parseInt(date.getFullYear());
    const currentYear = parseInt(new Date().getFullYear());

    return validForm.test(date.toISOString().slice(0,10)) && (currentYear - year >= ageLimit.min && currentYear - year <= ageLimit.maxs);
  };
}