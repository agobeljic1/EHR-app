module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: false,
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: false,
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: false,
      },
      emailAddress: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      tableName: "User",
    }
  );
};
