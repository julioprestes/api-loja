import { DataTypes } from 'sequelize';
import { sequelize } from '../config/postgres.js';

const Cupons = sequelize.define(
  'cupons',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    value: {
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
    uses: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 999,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

export default Cupons;