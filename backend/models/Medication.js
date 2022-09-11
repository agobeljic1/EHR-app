module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Medication",
    {
      id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
      },
      code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: false,
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: false,
      },
      amount: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: false,
      },
      form: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: false,
      },
      encounterId: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        references: {
          model: "Encounter",
          key: "id",
        },
      },
    },
    {
      tableName: "Medication",
    }
  );
};
