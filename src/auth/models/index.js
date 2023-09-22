'use strict';
require('dotenv').config();
const userModel = require('./users.model.js');
const TaskModel = require ('./tasks.model.js');
const { Sequelize, DataTypes } = require('sequelize');
const Collection = require('./DataCollection.js')



const DATABASE_URL= process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;
const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);


const TaskTable = TaskModel(sequelize, DataTypes);
const userTable = userModel(sequelize, DataTypes);


userTable.hasMany(TaskTable, {
  foreignKey: 'UserId',
  sourceKey: 'id',
});

TaskTable.belongsTo(userTable, {
  foreignKey: 'UserId',
  targetKey: 'id',
});



const taskCollection = new Collection(TaskTable);



module.exports = {
  db: sequelize,
  users: userTable,
  tasks : taskCollection,
}
