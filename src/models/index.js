import Addresses from "./AddressesModel.js";
import Categories from "./CategoriesModel.js";
import Cupons from "./CuponsModel.js";
import Orders from "./OrdersModel.js";
import OrdersProducts from "./OrdersProductsModel.js";
import Payments from "./PaymentsModel.js";
import Products from "./ProductsModel.js";
import Users from "./UsersModel.js";

// Associações
Orders.hasMany(OrdersProducts, {
  as: 'orders_products',
  foreignKey: 'idOrder'
});
OrdersProducts.belongsTo(Orders, {
  as: 'orders',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: {
    field: 'id_order',
    allowNull: false,
    name: 'idOrder',
  },
});
OrdersProducts.belongsTo(Products, {
  as: 'products',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_product',
    allowNull: false,
    name: 'idProduct',
  },
});

Categories.hasMany(Products, {
  foreignKey: {
    field: 'id_category',
    name: 'idCategory',
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Products.belongsTo(Categories, {
  as: 'categories',
  foreignKey: {
    field: 'id_category',
    name: 'idCategory',
  },
});

export {
  Orders,
  OrdersProducts,
  Products,
  Users,
  Addresses,
  Payments,
  Cupons,
  Categories
};


//  (async () => {
//     await Users.sync({ force:true });
//     await Payments.sync({ force:true });
//     await Addresses.sync({ force:true });
//     await Cupons.sync({ force:true });
//     await Categories.sync({ force:true });
//     await Orders.sync({ force:true });
//     await Products.sync({ force:true });
//     await OrdersProducts.sync({ force:true });
//  })();