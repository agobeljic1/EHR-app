const { verifyNurseOrDoctor, verifyNurse } = require("../utils/Auth");

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

    const fetchEncounterByIdQuery = `SELECT Encounter.id, Encounter.status, Encounter.priority, Encounter.periodStart, Encounter.periodEnd, Encounter.patientId, Encounter.organizationId, Organization.name as organizationName, Patient.given as patientGiven, Patient.family as patientFamily from Organization, Patient, Encounter where Encounter.id = ${id} AND Patient.id = Encounter.patientId AND Encounter.organizationId = Organization.id`;
    const fetchEncounterById = db.sequelize.query(fetchEncounterByIdQuery, {
      type: db.Sequelize.QueryTypes.SELECT,
    });

    fetchEncounterById
      .then((encounterWrapper) => {
        const encounter = encounterWrapper?.[0];
        if (!encounter) {
          throw new Error();
        }
        res.json({ encounter });
      })
      .catch(() => {
        res.status(500).json({ error: "Failed to fetch encounter" });
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

  app.post("/encounters", verifyNurse, (req, res) => {
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

  app.post("/encounters/:id/discharge", verifyNurseOrDoctor, (req, res) => {
    const { id } = req.params;
    db.encounter
      .update(
        {
          periodEnd: new Date(),
          status: "Finished",
        },
        { where: { id } }
      )
      .then((encounter) => {
        res.status(200).json({ encounter });
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
    const deleteAllergies = db.allergyIntolerance.destroy({
      where: {
        encounterId: id,
      },
    });
    const deleteConditions = db.condition.destroy({
      where: {
        encounterId: id,
      },
    });
    const deleteMedications = db.medication.destroy({
      where: {
        encounterId: id,
      },
    });

    const deleteEncounter = db.encounter.destroy({ where: { id } });

    Promise.all([deleteAllergies, deleteConditions, deleteMedications])
      .then(() => {
        deleteEncounter
          .then(() => {
            res.status(200).json({ success: true });
          })
          .catch(() => {
            res.status(500).json({ error: "Failed to delete encounter" });
          });
      })
      .catch(() => {
        res.status(500).json({ error: "Failed to delete encounter" });
      });
  });
};
