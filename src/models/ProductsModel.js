import { DataTypes } from 'sequelize';
import { sequelize } from '../config/postgres.js';
import Categories from './CategoriesModel.js';

const Products = sequelize.define(
  'products',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.STRING(300),
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

Products.belongsTo(Categories, {
  as: 'product',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_category',
    name: 'idCategory',
  },
});

export default Products;