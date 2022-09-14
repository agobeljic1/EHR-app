const { verifyNurseOrDoctor } = require("../utils/Auth");

module.exports = function (app, db) {
  app.get("/medications", verifyNurseOrDoctor, async (req, res) => {
    const { encounterId } = req.query;

    db.medication
      .findAll({
        attributes: ["id", "code", "status", "amount", "form", "encounterId"],
        where: {
          encounterId,
        },
      })
      .then((medications) => {
        res.json({ medications });
      })
      .catch(() => {
        res.status(500).json({ error: "Failed to fetch medications" });
      });
  });

  app.post("/medications", verifyNurseOrDoctor, (req, res) => {
    const { encounterId } = req.query;
    const { code, status, amount, form } = req.body;
    db.medication
      .create({
        code,
        status,
        amount,
        form,
        encounterId,
      })
      .then((medication) => {
        res.status(201).json({ medication });
      })
      .catch((e) => {
        console.log(e);
        res.status(400).json({ error: "Failed to create medication" });
      });
  });

  app.put("/medications", verifyNurseOrDoctor, (req, res) => {
    const { id, status, code, amount, form } = req.body;
    db.medication
      .update(
        {
          code,
          status,
          amount,
          form,
        },
        { where: { id } }
      )
      .then((medication) => {
        res.status(204).json({ medication });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({ error: "Failed to update medication" });
      });
  });

  app.delete("/medications/:id", verifyNurseOrDoctor, (req, res) => {
    const { id } = req.params;
    db.medication
      .destroy({ where: { id } })
      .then(() => {
        res.status(200).json({ success: true });
      })
      .catch(() => {
        res.status(500).json({ error: "Failed to delete medication" });
      });
  });
};
