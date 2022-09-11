module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "AllergyIntolerance",
    {
      id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
      },
      onsetDateTime: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: false,
      },
      recordedDate: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: false,
      },
      category: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: false,
      },
      criticality: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: false,
      },
      clinicalStatus: {
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
      recorder: {
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
