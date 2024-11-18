const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('master_pol', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

const Partner = sequelize.define('Partner', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  company_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  legal_address: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  inn: {
    type: DataTypes.STRING(12),
    allowNull: false,
  },
  director_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  contact_phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  contact_email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  logo: {
    type: DataTypes.BLOB,
    allowNull: true, 
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  sales_points: {
    type: DataTypes.TEXT,
    allowNull: true, 
  },
  sales_history: {
    type: DataTypes.TEXT,
    allowNull: true, 
  },
}, {
  tableName: 'partners', 
  timestamps: false, // Отключить автоматическое добавление полей createdAt и updatedAt
});

module.exports = Partner;