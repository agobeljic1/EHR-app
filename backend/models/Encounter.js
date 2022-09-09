module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Encounter",
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
      priority: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: false,
      },
      periodStart: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: false,
      },
      periodEnd: {
        type: DataTypes.DATE,
        allowNull: true,
        unique: false,
      },
      patientId: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        references: {
          model: "Patient",
          key: "id",
        },
      },
      organizationId: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        references: {
          model: "Organization",
          key: "id",
        },
      },
    },
    {
      tableName: "Encounter",
    }
  );
};
