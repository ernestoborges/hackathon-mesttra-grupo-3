const { DataTypes } = require('sequelize');
const { sequelize } = require("../connect");

const Campanha = sequelize.define('Campanha', {
    id_campanha: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    data_inicio: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    data_fim: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'campanha',
    timestamps: false,
});

module.exports = {
    Campanha
};