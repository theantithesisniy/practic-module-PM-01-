// models/PartnerProductsImport.js
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('master_pol', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

const ProductType = sequelize.define('ProductType', {
    product_type: {
        type: DataTypes.TEXT,
        primaryKey: true 
    },
    'product type coefficient': DataTypes.DOUBLE,
}, {
    tableName: 'product_type_import',
    timestamps: false
});

module.exports = ProductType;
