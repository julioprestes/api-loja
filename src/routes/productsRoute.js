import productsController from "../controllers/productsController.js";

export default (app) => {
    app.get('/products', productsController.get);
    app.get('/products/:id', productsController.get);
    app.post('/products', productsController.persist);
    app.patch('/products/:id', productsController.persist);
    app.delete('/products/:id', productsController.destroy);
}