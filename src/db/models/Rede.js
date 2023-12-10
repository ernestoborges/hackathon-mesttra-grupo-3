const { DataTypes } = require('sequelize');
const { sequelize } = require("../connect");

const Rede = sequelize.define('rede', {
  id_rede: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  tipo_rede: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'rede',
  timestamps: false, 
});

module.exports = {
  Rede
};