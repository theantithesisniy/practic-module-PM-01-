// models/PartnerProductsImport.js
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('master_pol', 'root', 'root', {
	host: 'localhost',
	dialect: 'mysql',
	port: 3306
});

const PartnerProducts = sequelize.define('PartnerProducts', {
	products: {
		type: DataTypes.TEXT,
	},
	Name_partner: {
		type: DataTypes.TEXT,
	},
	Quantity_production: {
		type: DataTypes.INTEGER,
	},
	Date_Sale: {
		type: DataTypes.TEXT,
	}
}, {
	tableName: 'partner_products_import',
	timestamps: false
});

module.exports = PartnerProducts;
