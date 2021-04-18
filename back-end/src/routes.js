import { Router } from 'express'
import * as userController from './controllers/userController'

const router = Router();

router.post('/cadastrar', userController.create);
router.post('/editar-perfil', userController.editProfile);
router.get('/listar-usuarios/:name', userController.list);


export default router;