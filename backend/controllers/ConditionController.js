const { verifyNurseOrDoctor, verifyDoctor } = require("../utils/Auth");

module.exports = function (app, db) {
  app.get("/conditions", verifyNurseOrDoctor, async (req, res) => {
    const { encounterId } = req.query;

    const fetchConditionsByEncounterIdQuery =
      "SELECT cond.id, cond.status, cond.severity, cond.recordedDate, cond.recorder, cond.encounterId, User.given as userGiven, User.family as userFamily from `Condition` cond, User where cond.recorder = User.id AND cond.encounterId = " +
      encounterId;
    const fetchConditionsByEncounterId = db.sequelize.query(
      fetchConditionsByEncounterIdQuery,
      {
        type: db.Sequelize.QueryTypes.SELECT,
      }
    );

    fetchConditionsByEncounterId
      .then((conditions) => {
        res.json({ conditions });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({ error: "Failed to fetch conditions" });
      });
  });

  app.post("/conditions", verifyDoctor, (req, res) => {
    const { encounterId } = req.query;
    const { id: userId } = req.user;
    const { status, priority, severity } = req.body;
    db.condition
      .create({
        status,
        priority,
        severity,
        encounterId,
        recordedDate: new Date(),
        recorder: userId,
      })
      .then((condition) => {
        res.status(201).json({ condition });
      })
      .catch((e) => {
        console.log(e);
        res.status(400).json({ error: "Failed to create condition" });
      });
  });

  app.put("/conditions", verifyNurseOrDoctor, (req, res) => {
    const { id, status, severity } = req.body;
    db.condition
      .update(
        {
          status,
          severity,
        },
        { where: { id } }
      )
      .then((condition) => {
        res.status(204).json({ condition });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({ error: "Failed to update condition" });
      });
  });

  app.delete("/conditions/:id", verifyNurseOrDoctor, (req, res) => {
    const { id } = req.params;
    db.condition
      .destroy({ where: { id } })
      .then(() => {
        res.status(200).json({ success: true });
      })
      .catch(() => {
        res.status(500).json({ error: "Failed to delete condition" });
      });
  });
};
