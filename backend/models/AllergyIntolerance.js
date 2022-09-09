module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "AllergyIntolerance",
    {
      id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: false,
      },
      severity: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: false,
      },
      encounterId: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
    },
    {
      tableName: "AllergyIntolerance",
    }
  );
};
