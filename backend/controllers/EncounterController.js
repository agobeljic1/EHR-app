const { verifyNurseOrDoctor } = require("../utils/Auth");

module.exports = function (app, db) {
  app.get("/encounters", verifyNurseOrDoctor, async (req, res) => {
    const { organizationId } = req.query;

    const fetchEncountersByOrganizationQuery = `SELECT Encounter.id, Encounter.status, Encounter.priority, Encounter.periodStart, Encounter.periodEnd, Encounter.patientId, Encounter.organizationId, Organization.name as organizationName, Patient.given as patientGiven, Patient.family as patientFamily from Organization, Patient, Encounter where Organization.id = ${organizationId} AND Patient.id = Encounter.patientId AND Encounter.organizationId = Organization.id`;
    const fetchEncountersByOrganization = db.sequelize.query(
      fetchEncountersByOrganizationQuery,
      {
        type: db.Sequelize.QueryTypes.SELECT,
      }
    );

    fetchEncountersByOrganization
      .then((encounters) => {
        res.json({ encounters });
      })
      .catch(() => {
        res.status(500).json({ error: "Failed to fetch encounters" });
      });
  });

  app.get("/encounters/:id", verifyNurseOrDoctor, async (req, res) => {
    const { id } = req.params;
    const fetchEncounterById = db.encounter
      .findOne({
        attributes: [
          "id",
          "status",
          "priority",
          "periodStart",
          "periodEnd",
          "patientId",
          "organizationId",
        ],
        where: { id },
      })
      .then(({ dataValues: encounter }) => encounter);
    fetchEncounterById
      .then((encounter) => {
        res.json({ encounter });
      })
      .catch(() => {
        res.status(500).json({ error: "Failed to fetch encounter" });
      });
  });

  app.post("/encounters", verifyNurseOrDoctor, (req, res) => {
    const { organizationId } = req.query;
    const { status, priority, periodStart, periodEnd, patientId } = req.body;
    db.encounter
      .create({
        status,
        priority,
        periodStart,
        periodEnd,
        patientId,
        organizationId,
      })
      .then((encounter) => {
        res.status(201).json({ encounter });
      })
      .catch((e) => {
        console.log(e);
        res.status(400).json({ error: "Failed to create encounter" });
      });
  });

  app.put("/encounters", verifyNurseOrDoctor, (req, res) => {
    const { organizationId } = req.query;
    const { id, status, priority, periodStart, periodEnd, patientId } =
      req.body;
    db.encounter
      .update(
        {
          status,
          priority,
          periodStart,
          periodEnd,
          patientId,
          organizationId,
        },
        { where: { id } }
      )
      .then((encounter) => {
        res.status(204).json({ encounter });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({ error: "Failed to update encounter" });
      });
  });

  app.delete("/encounters/:id", verifyNurseOrDoctor, (req, res) => {
    const { id } = req.params;
    db.encounter
      .destroy({ where: { id } })
      .then(() => {
        res.status(200).json({ success: true });
      })
      .catch(() => {
        res.status(500).json({ error: "Failed to delete encounter" });
      });
  });
};
