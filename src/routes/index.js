import addressesRoute from "./addressesRoute.js";
import categoriesRoute from "./categoriesRoute.js";
import cuponsRoute from "./cuponsRoute.js";
import ordersProductsRoute from "./ordersProductsRoute.js";
import ordersRoute from "./ordersRoute.js";
import paymentsRoute from "./paymentsRoute.js";
import productsRoute from "./productsRoute.js";
import usersRoute from "./usersRoute.js";


function Routes(app) {
    usersRoute(app);
    addressesRoute(app);
    categoriesRoute(app);
    cuponsRoute(app);
    ordersProductsRoute(app);
    ordersRoute(app);
    paymentsRoute(app);
    productsRoute(app);

}

export default Routes;