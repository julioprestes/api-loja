import ordersProductsController from "../controllers/ordersProductsController.js";

export default (app) => {
    app.get('/ordersProducts', ordersProductsController.get);
    app.get('/ordersProducts/:id', ordersProductsController.get);
    app.post('/ordersProducts', ordersProductsController.persist);
    app.patch('/ordersProducts/:id', ordersProductsController.persist);
    app.delete('/ordersProducts/:id', ordersProductsController.destroy);
}