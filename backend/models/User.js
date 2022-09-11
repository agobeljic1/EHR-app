module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
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
      given: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: false,
      },
      family: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: false,
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: false,
      },
      gender: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: false,
      },
      line: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: false,
      },
      city: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: false,
      },
      country: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: false,
      },
      role: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: false,
      },
      selectedOrganizationId: {
        type: DataTypes.STRING(10),
        allowNull: true,
        unique: false,
      },
    },
    {
      tableName: "User",
    }
  );
};
