import * as jwt from 'jsonwebtoken'

const dotenv = require('dotenv');
// configurar o dotenv para acessar as váriáveis de ambiente
const result = dotenv.config({ path: __dirname + '/../.env' })
if (result.error) {
  throw result.error
}

const checkUserAuth = async function (req, res, next) {
  console.log('checkUserAuth')

  let token = req.headers.authorization
  console.log(`token: ${token}`)
  if (!token){
    return res.status(403).json({message: "Desculpe, mas você não está autorizado a acessar esta página."})
  }

  try {
    let token = req.headers.authorization
    let decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    next()
  } catch (err) {
    return res.status(401).json({err: err, message: "Login não autorizado"})
  }
}

export default checkUserAuth