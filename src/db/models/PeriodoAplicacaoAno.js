const { DataTypes } = require('sequelize');
const { sequelize } = require("../connect");
const { Vacina } = require("./Vacina")

const PeriodoAplicacaoAno = sequelize.define('PAA', {
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
        onUpdate: 'restrict',
        onDelete: 'restrict',
    },
    qtd_ano_inicial: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    qtd_ano_final: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    desc_ano: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'periodoaplicacaoano',
    timestamps: false,
});

PeriodoAplicacaoAno.hasOne(Vacina, { foreignKey: 'id_vacina' });
Vacina.belongsTo(PeriodoAplicacaoAno, { foreignKey: 'id_vacina' });

module.exports = {
    PeriodoAplicacaoAno
};