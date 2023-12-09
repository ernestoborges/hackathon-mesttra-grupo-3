const { DataTypes } = require('sequelize');
const { sequelize } = require("../connect")

const Vacina = sequelize.define('Vacina', {
    id_vacina: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    vacina: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    sigla_vacina: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    doenca_protecao: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    dose: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    id_rede: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'vacina',
    timestamps: false,
});

module.exports = {
    Vacina
}