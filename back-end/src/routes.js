import { Router } from 'express'
import * as userController from './controllers/userController'

const router = Router();

router.post('/cadastrar', userController.createUser);
router.put('/editar-perfil', userController.updateProfile);
router.get('/listar-usuarios/:name', userController.list);
router.post('/login', userController.login)


export default router;