'use strict';

module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define(
    'Chat',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {},
  );
  Chat.associate = function (models) {
    models.Chat.belongsToMany(models.User, { through: 'users_chats' });
    models.Chat.hasMany(models.Message);
  };
  return Chat;
};
