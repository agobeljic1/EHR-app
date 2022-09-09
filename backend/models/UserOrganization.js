module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "UserOrganization",
    {
      id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        unique: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      organizationId: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        unique: false,
        references: {
          model: "Organization",
          key: "id",
        },
      },
    },
    {
      tableName: "UserOrganization",
    }
  );
};
