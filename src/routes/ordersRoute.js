import ordersController from "../controllers/ordersController.js";

export default (app) => {
    app.get('/orders', ordersController.get);
    app.get('/orders/:id', ordersController.get);
    app.post('/orders', ordersController.persist);
    app.patch('/orders/:id', ordersController.persist);
    app.delete('/orders/:id', ordersController.destroy);
}