const { DataTypes } = require('sequelize');
const { sequelize } = require("../connect")

const Vacina = sequelize.define('Vacina', {
    ID_VACINA: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    VACINA: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    SIGLA_VACINA: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    DOENCA_PROTECAO: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    DOSE: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    ID_REDE: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'VACINA',
    timestamps: false,
});

module.exports = {
    Vacina
}