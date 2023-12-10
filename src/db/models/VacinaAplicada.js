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

Paciente.hasMany(VacinaAplicada, { foreignKey: 'id_paciente' });
VacinaAplicada.belongsTo(Paciente, { foreignKey: 'id_paciente' });
Vacina.hasMany(VacinaAplicada, { foreignKey: 'id_vacina' });
VacinaAplicada.belongsTo(Vacina, { foreignKey: 'id_vacina' });

module.exports = {
  VacinaAplicada
};