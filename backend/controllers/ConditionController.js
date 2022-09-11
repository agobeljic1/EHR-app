const { verifyNurseOrDoctor } = require("../utils/Auth");

module.exports = function (app, db) {
  app.get("/conditions", verifyNurseOrDoctor, async (req, res) => {
    const { encounterId } = req.query;

    db.condition
      .findAll({
        attributes: ["id", "status", "severity", "recordedDate", "encounterId"],
        where: {
          encounterId,
        },
      })
      .then((conditions) => {
        res.json({ conditions });
      })
      .catch(() => {
        res.status(500).json({ error: "Failed to fetch conditions" });
      });
  });

  app.get("/conditions/:id", verifyNurseOrDoctor, async (req, res) => {
    const { id } = req.params;
    const fetchConditionById = db.condition
      .findOne({
        attributes: ["id", "status", "severity", "redordedDate", "encounterId"],
        where: { id },
      })
      .then(({ dataValues: condition }) => condition);
    fetchConditionById
      .then((condition) => {
        res.json({ condition });
      })
      .catch(() => {
        res.status(500).json({ error: "Failed to fetch condition" });
      });
  });

  app.post("/conditions", verifyNurseOrDoctor, (req, res) => {
    const { status, priority, severity } = req.body;
    db.condition
      .create({
        status,
        priority,
        severity,
        recordedDate: new Date(),
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
    const { id, status, priority, severity } = req.body;
    db.condition
      .update(
        {
          status,
          priority,
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
