const { DataTypes } = require('sequelize');
const { sequelize } = require("../connect");

const Paciente = sequelize.define('Paciente', {
    id_paciente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    data_nascimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'paciente',
    timestamps: false,
  });

module.exports = {
    Paciente
};