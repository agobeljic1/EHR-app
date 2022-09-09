module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Organization",
    {
      id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
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
    },
    {
      tableName: "Organization",
    }
  );
};
