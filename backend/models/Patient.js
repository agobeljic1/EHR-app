module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Patient",
    {
      id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
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
      organizationId: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        onDelete: "cascade",
        hooks: true,
        references: {
          model: "Organization",
          key: "id",
        },
      },
    },
    {
      tableName: "Patient",
    }
  );
};
