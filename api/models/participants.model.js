const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Participant = sequelize.define('Participant', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
},
    {
        timestamps: true // adds createdAt and updatedAt
    });




module.exports = Participant;
