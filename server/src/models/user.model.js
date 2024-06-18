import { sequelize } from '../utils/database.js';
import { DataTypes } from 'sequelize';

const UserModel = sequelize.define('users', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
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
  names: {
    type: DataTypes.STRING(255),
    allowNull: true,
  }
},{
    timestamps:true,
  },
);


export default UserModel