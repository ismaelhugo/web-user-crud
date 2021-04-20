/* Função para verificar se um email já existe no bd */
import connection from "../bd";

export default async function emailAlreadyExists(email) {
  if (!email) {
    return new Error({
      message: 'Email inválido'
    });
  } else {
    connection.query('SELECT * FROM usuario WHERE email = (?)',
      email,
      (err, found_email) => {
        if (err) {
          return err;
        } else {
          if (!found_email) {
            return false;

          } else return true;
        };
      }
    );
  };
};