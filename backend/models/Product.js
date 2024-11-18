// models/PartnerProductsImport.js
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('master_pol', 'root', 'root', {
	host: 'localhost',
	dialect: 'mysql',
	port: 3306
});

const Product = sequelize.define('Product', {
	product_type: DataTypes.TEXT,
	product_name: DataTypes.TEXT,
	article: DataTypes.INTEGER,
	minimum_cost_for_partner: DataTypes.DOUBLE,
});

module.exports = Product;
