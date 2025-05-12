import { DataTypes } from 'sequelize';
import { sequelize } from '../config/postgres.js';
import Users from './UsersModel.js';

const Addresses = sequelize.define(
  'addresses',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    zipCode: {
      field: 'zip_code',
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    numberForget: {
      field: 'number_forget',
      type: DataTypes.STRING(255),
      
    },
    idUser: {
      field: 'id_user',
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

Addresses.belongsTo(Users, {
  as: 'users',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_user',
    name: 'idUser',
  },
});

export default Addresses;