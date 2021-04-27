import { Router } from 'express';
import * as userController from './controllers/userController';
import resources from './resources';

const router = Router();

router.post('/cadastrar', userController.createUser);
router.put('/editar-perfil', userController.updateUser);
router.get('/listar-usuarios/:name', userController.list);
router.post('/login', userController.login);
// router.get('/delete', userController.deleteUser);

// teste de autenticação
router.get('/segredo', resources.authenticateToken, userController.secret)

export default router;