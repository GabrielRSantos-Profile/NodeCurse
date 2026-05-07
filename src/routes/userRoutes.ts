/**
 * @params Router - Express Router para definir rotas
 * @params UserController - Controlador para gerenciar operações de usuário
 * 
 * 
 * @params router - Instancia do Router;
 * @params userController - Construtor da classe UserController e hamado, inicializando as propriedades internas (como private users: User[] e private currentId )(Mantem o estado(a lista de usuarios em memoria) e permite que os metodos acessem this.users.)
 * Este módulo define as rotas para operações CRUD de usuários, utilizando o UserController para lidar com as requisições.
 */
import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = new UserController();

/**
 * Rotas CRUD
 * @param GET /users - Quando o servidor receber uma requisiçao GET para /users, o express chama a funçao userController.getAll. Essa funçao deve ser um middleware ou handler de rota(recebe req, res, next). Assumme-se que getAll esta definido como arrow function ou metodo ligado a instancia
 * @param HTTP GET - Usado para recuperar recursos.
 * @param /users - relativo ao prefixo onde este roteador for montao (se montado em /api, a rota completa e /api/users)
 */
router.get('/users', userController.getAll);
router.get('/users/:id', userController.getById);
router.post('/users', userController.create);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);

export default router;