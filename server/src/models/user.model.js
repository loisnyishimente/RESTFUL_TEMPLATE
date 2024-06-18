import { sequelize } from '../utils/database.js';
import { DataTypes } from 'sequelize';

const UserModel = sequelize.define('users', {

  id: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.INTEGER,
    primaryKey: true,
  },
  firstname: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    selectable: false,
  },
  lastname: {
    type: DataTypes.STRING(255),
    allowNull: true,
  }
},{
    timestamps:true,
  },
);


export default UserModel