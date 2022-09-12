const { verifyNurseOrDoctor } = require("../utils/Auth");

module.exports = function (app, db) {
  app.get("/allergys", verifyNurseOrDoctor, async (req, res) => {
    const { encounterId } = req.query;

    const fetchAllergyIntolerancesByEncounterIdQuery =
      "SELECT allergy.id, allergy.onsetDateTime, allergy.recordedDate, allergy.category, allergy.criticality, allergy.clinicalStatus, allergy.note, allergy.encounterId, User.given as userGiven, User.family as userFamily from `AllergyIntolerance` allergy, User where allergy.recorder = User.id AND allergy.encounterId = " +
      encounterId;
    const fetchAllergyIntolerancesByEncounterId = db.sequelize.query(
      fetchAllergyIntolerancesByEncounterIdQuery,
      {
        type: db.Sequelize.QueryTypes.SELECT,
      }
    );

    fetchAllergyIntolerancesByEncounterId
      .then((allergys) => {
        res.json({ allergys });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({ error: "Failed to fetch allergies" });
      });
  });

  app.post("/allergys", verifyNurseOrDoctor, (req, res) => {
    const { encounterId } = req.query;
    const { id: userId } = req.user;
    const { onsetDateTime, category, criticality, clinicalStatus, note } =
      req.body;
    db.allergyIntolerance
      .create({
        onsetDateTime,
        category,
        criticality,
        clinicalStatus,
        encounterId,
        note,
        recordedDate: new Date(),
        recorder: userId,
      })
      .then((allergy) => {
        res.status(201).json({ allergy });
      })
      .catch((e) => {
        console.log(e);
        res.status(400).json({ error: "Failed to create allergy" });
      });
  });

  app.put("/allergys", verifyNurseOrDoctor, (req, res) => {
    const { id, onsetDateTime, category, criticality, clinicalStatus, note } =
      req.body;
    db.allergyIntolerance
      .update(
        {
          onsetDateTime,
          category,
          criticality,
          clinicalStatus,
          note,
        },
        { where: { id } }
      )
      .then((allergy) => {
        res.status(204).json({ allergy });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({ error: "Failed to update allergy" });
      });
  });

  app.delete("/allergys/:id", verifyNurseOrDoctor, (req, res) => {
    const { id } = req.params;
    db.allergyIntolerance
      .destroy({ where: { id } })
      .then(() => {
        res.status(200).json({ success: true });
      })
      .catch(() => {
        res.status(500).json({ error: "Failed to delete allergy" });
      });
  });
};
