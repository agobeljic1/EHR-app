const { verifyNurse, verifyNurseOrDoctor } = require("../utils/Auth");

module.exports = function (app, db) {
  app.get("/encounters", verifyNurseOrDoctor, async (req, res) => {
    const { patientId, organizationId } = req.params;

    db.encounter
      .findAll({
        attributes: [
          "id",
          "status",
          "priority",
          "periodStart",
          "periodEnd",
          "patientId",
          "organizationId",
        ],
      })
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

  app.post("/encounters", verifyNurse, (req, res) => {
    const {
      status,
      priority,
      periodStart,
      periodEnd,
      patientId,
      organizationId,
    } = req.body;
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
      .catch(() => {
        res.status(400).json({ error: "Failed to create encounter" });
      });
  });

  app.put("/encounters", verifyNurseOrDoctor, (req, res) => {
    const {
      id,
      status,
      priority,
      periodStart,
      periodEnd,
      patientId,
      organizationId,
    } = req.body;
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
