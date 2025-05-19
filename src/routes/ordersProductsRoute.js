import ordersProductsController from "../controllers/ordersProductsController.js";

export default (app) => {
    app.get('/orders-products', ordersProductsController.get);
    app.get('/orders-products/:id', ordersProductsController.get);
    app.post('/orders-products', ordersProductsController.persist);
    app.patch('/orders-products/:id', ordersProductsController.persist);
    app.delete('/orders-products/:id', ordersProductsController.destroy);
}