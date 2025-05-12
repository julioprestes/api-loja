import paymentsController from "../controllers/paymentsController.js";

export default (app) => {
    app.get('/payments', paymentsController.get);
    app.get('/payments/:id', paymentsController.get);
    app.post('/payments', paymentsController.persist);
    app.patch('/payments/:id', paymentsController.persist);
    app.delete('/payments/:id', paymentsController.destroy);
}