// models/PartnerProductsImport.js
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('master_pol', 'root', 'root', {
	host: 'localhost',
	dialect: 'mysql',
	port: 3306
});

const MaterialType = sequelize.define('MaterialType', {
	material_type: {
		type: DataTypes.TEXT,
		primaryKey: true // Укажите, что это первичный ключ
	},
	reject_rate: DataTypes.DOUBLE,
}, {
	tableName: 'material_type_import',
	timestamps: false
});

module.exports = MaterialType;
