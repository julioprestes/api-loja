import cuponsController from "../controllers/cuponsController.js";

export default (app) => {
    app.get('/cupons', cuponsController.get);
    app.get('/cupons/:id', cuponsController.get);
    app.post('/cupons', cuponsController.persist);
    app.patch('/cupons/:id', cuponsController.persist);
    app.delete('/cupons/:id', cuponsController.destroy);
}