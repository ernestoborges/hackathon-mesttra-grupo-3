const { DataTypes } = require('sequelize');
const { sequelize } = require("../connect");
const { Vacina } = require("./Vacina")
const { Campanha } = require("./Campanha")

const CampanhaVacina = sequelize.define('CampanhaVacina', {
    id_campanha: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Campanha,
            key: 'ID_CAMPANHA',
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
            key: 'ID_VACINA',
        },
        onUpdate: 'restrict',
        onDelete: 'restrict',
    },
}, {
    tableName: 'campanhavacina',
    timestamps: false,
});

module.exports = {
    CampanhaVacina
};