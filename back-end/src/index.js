const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
import routes from './routes'

app.use(express.json())
app.use(cors())
app.use(routes)

app.listen(port, () => {
  console.log(`Rodando em: http://localhost:${port}`)
})