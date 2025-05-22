import usersController from "../controllers/usersController.js";


export default (app) => {
    app.get('/users/info-by-token', usersController.getDataByToken);
    app.get('/users', usersController.get);
    app.get('/users/:id', usersController.get);
    app.post('/users', usersController.persist);
    app.patch('/users/:id', usersController.persist);
    app.delete('/users/:id', usersController.destroy);
    app.post('/users/login',usersController.login);
    app.post('/users/recuperar-senha',usersController.recuperarSenha);
    app.post('/users/redefinir-senha', usersController.redefinirSenha);
}