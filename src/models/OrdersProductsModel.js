import { DataTypes } from 'sequelize';
import { sequelize } from '../config/postgres.js';
import Orders from './OrdersModel.js';
import Products from './ProductsModel.js';

const OrdersProducts = sequelize.define(
  'orders_products',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    priceProducts: {
      field: 'price_products',
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

OrdersProducts.belongsTo(Orders, {
  as: 'orders',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_order',
    allowNull: false,
    unique: true,
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
    unique: true,
    name: 'idProduct',
  },
});

export default OrdersProducts;