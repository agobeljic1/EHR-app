require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./models/db.js");
const {
  initializeDatabaseAdminUser,
  verifyTokenAndSetUser,
} = require("./utils/Auth.js");
const port = process.env.PORT || 8000;
db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Successfully connected with the database");
    initializeDatabaseAdminUser(db);
  })
  .catch((err) => {
    console.log("Failed to connect with the database");
    console.error(err);
  });

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

require("./controllers/AuthController.js")(app, db);
app.use(verifyTokenAndSetUser);
require("./controllers/MeController.js")(app, db);
require("./controllers/UserController.js")(app, db);
require("./controllers/OrganizationController.js")(app, db);
require("./controllers/PatientController.js")(app, db);
require("./controllers/EncounterController.js")(app, db);
require("./controllers/ConditionController.js")(app, db);
require("./controllers/AllergyIntoleranceController.js")(app, db);

app.listen(port, () => {
  console.log("server successfully started on port " + port);
});
