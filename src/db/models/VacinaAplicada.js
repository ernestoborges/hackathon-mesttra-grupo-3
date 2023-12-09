const { DataTypes } = require('sequelize');
const { sequelize } = require("../connect");
const { Vacina } = require("./Vacina")
const { Paciente } = require("./Paciente")

const VacinaAplicada = sequelize.define('VacinaAplicada', {
  id_paciente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Paciente,
      key: 'id_paciente',
    },
    onUpdate: 'restrict',
    onDelete: 'restrict',
  },
  id_vacina: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Vacina,
      key: 'id_vacina',
    },
    onUpdate: 'restrict',
    onDelete: 'restrict',
  },
  data_aplicacao: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'vacinaaplicada',
  timestamps: false,
});

module.exports = {
  VacinaAplicada
};