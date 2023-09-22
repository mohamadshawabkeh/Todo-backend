const Task = (sequelize, DataTypes) => sequelize.define('Task', {
  text: { type: DataTypes.STRING, allowNull: false },
  assignee: { type: DataTypes.STRING },
  difficulty: { type: DataTypes.INTEGER },
  UserId: {
    type: DataTypes.INTEGER, 

  },
});

module.exports = Task;
