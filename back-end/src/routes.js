import { Router } from 'express'
import * as userController from './controllers/userController'

const router = Router();

router.post('/cadastrar', userController.createUser);
router.post('/editar-perfil', userController.updateProfile);
router.get('/listar-usuarios/:name', userController.list);


export default router;