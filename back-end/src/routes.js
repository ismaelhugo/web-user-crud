import { Router } from 'express'
import * as userController from './controllers/userController'

const router = Router();

router.get('/listar-usuarios', userController.list)
router.post('/cadastrar', userController.create)

export default router