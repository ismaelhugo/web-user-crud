import { Router } from 'express';
import * as userController from './controllers/userController';
import checkUserAuth from './middlewares/checkUserAuth'

const router = Router();

// Acessáveis por qualquer pessoa (não necessita de autenticação)
router.post('/cadastrar', userController.createUser);
router.post('/login', userController.login);

// Restritas aos usuários
router.put('/editar-perfil', checkUserAuth, userController.updateUser);
router.put('/atualizar-senha', checkUserAuth, userController.updatePassword);
router.get('/listar-usuarios/:name', userController.list);
router.delete('/delete/:id', checkUserAuth, userController.deleteUser);

export default router;