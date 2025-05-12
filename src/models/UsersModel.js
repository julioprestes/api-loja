import { DataTypes } from "sequelize";
import { sequelize } from "../config/postgres.js";

const Users = sequelize.define(
    'users',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },

        passwordHash: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING(100),
        },
        role: {
            type: DataTypes.STRING(100)
        },

        cpf: {
            type: DataTypes.STRING(14),
            allowNull: false,
            unique: true,
        },
        cart: {
            type: DataTypes.JSONB,
        },
        codigoSenha: {
            field: 'codigo_senha',
            type: DataTypes.STRING(255),
        },
        codigoSenhaExpiracao: {
            field: 'codigo_senha_expiracao',
            type: DataTypes.DATE,
        }
        
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'create_at',
        updatedAt: 'updated_at',
    }
);


export default Users;