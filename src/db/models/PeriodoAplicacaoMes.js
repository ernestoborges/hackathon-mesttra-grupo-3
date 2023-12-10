const { DataTypes } = require('sequelize');
const { sequelize } = require("../connect");
const { Vacina } = require("./Vacina");

const PeriodoAplicacaoMes = sequelize.define('PAM', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  id_vacina: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Vacina,
      key: 'id_vacina',
    },
  },
  qtd_meses_inicial: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  qtd_meses_final: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  desc_meses: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'periodoaplicacaomes',
  timestamps: false,
});

PeriodoAplicacaoMes.hasOne(Vacina, { foreignKey: 'id_vacina' });
Vacina.belongsTo(PeriodoAplicacaoMes, { foreignKey: 'id_vacina' });

module.exports = {
  PeriodoAplicacaoMes
};