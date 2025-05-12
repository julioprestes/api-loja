import { DataTypes } from "sequelize";
import { sequelize } from "../config/postgres.js";

const Payments = sequelize.define(
    'payments',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'create_at',
        updatedAt: 'updated_at',
    }
);

export default Payments;