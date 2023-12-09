const { DataTypes } = require('sequelize');
const { sequelize } = require("../connect");
const { Vacina } = require("./Vacina")

const PeriodoAplicacaoAno = sequelize.define('PeriodoAplicacaoAno', {
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
            key: 'ID_VACINA',
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

module.exports = {
    PeriodoAplicacaoAno
};