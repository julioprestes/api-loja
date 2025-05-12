import addressesController from "../controllers/addressesController.js";

export default (app) => {
    app.get('/addresses', addressesController.get);
    app.get('/addresses/:id', addressesController.get);
    app.post('/addresses', addressesController.persist);
    app.patch('/addresses/:id', addressesController.persist);
    app.delete('/addresses/:id', addressesController.destroy);
}