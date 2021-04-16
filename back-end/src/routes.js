import { Router } from 'express'
import * as userController from './controllers/userController'

const router = Router();

router.get('/listar-usuarios', userController.list)

//import * as LoginController from './controllers/LoginController'

// login
// router.post('/login', LoginController.authorizeUser)
// router.post('/login/admin', LoginController.authorizeAdmin)

export default router