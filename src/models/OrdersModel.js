import { DataTypes } from 'sequelize';
import { sequelize } from '../config/postgres.js';
import Addresses from './AddressesModel.js';
import Payments from './PaymentsModel.js';
import Users from './UsersModel.js';
import Cupons from './CuponsModel.js';

const Orders = sequelize.define(
  'orders',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.STRING(255),
      defaultValue: 'criado',
    },
    total: {
      type: DataTypes.NUMERIC,
    },
    totalDiscount: {
      field: 'total_discount',
      type: DataTypes.NUMERIC,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

Orders.belongsTo(Users, {
  as: 'customer',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_user_costumer',
    allowNull: false,
    name: 'idUserCustomer',
  },
});

Orders.belongsTo(Users, {
  as: 'deliver',
  onDelete: 'no action',  
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_user_deliver',
    name: 'idUserDeliver',
  },
});

Orders.belongsTo(Addresses, {
  as: 'address',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_address',
    name: 'idAddress',
  },
});

Orders.belongsTo(Payments, {
  as: 'payment',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_user_costumer',
    allowNull: false,
    name: 'idPayment',
  },
});

Orders.belongsTo(Cupons, {
  as: 'cupons',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_cupom',
    name: 'idCupom',
  },
});

export default Orders;