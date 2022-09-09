const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_USER,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    port: 3306,
    define: {
      timestamps: false,
    },
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//model import
db.allergyIntolerance = require("./AllergyIntolerance.js")(
  sequelize,
  Sequelize
);
db.condition = require("./Condition.js")(sequelize, Sequelize);
db.encounter = require("./Encounter.js")(sequelize, Sequelize);
db.medication = require("./Medication.js")(sequelize, Sequelize);
db.organization = require("./Organization.js")(sequelize, Sequelize);
db.patient = require("./Patient.js")(sequelize, Sequelize);
db.user = require("./User.js")(sequelize, Sequelize);
db.userOrganization = require("./UserOrganization.js")(sequelize, Sequelize);

module.exports = db;
