import { DataTypes } from 'sequelize';
import { sequelize } from '../config/postgres.js';
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
    idOrder: {
      field: 'id_order',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idProduct: {
      field: 'id_product',
      type: DataTypes.INTEGER,
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

export default OrdersProducts;