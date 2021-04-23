/* Função para verificar se um email já existe no bd */
import connection from "../bd";

export default function emailAlreadyExists(email) {
  let found = connection.query('SELECT * FROM usuario WHERE email = (?)',
    [email],
    (err, found_email) => {
      if (err) {
        return err;
      } else {
        return found_email;
      };
    }
  );

  if (found.length > 0) {
    return true;

  } else {
    console.log(`!found`)
    return false;
  }
};