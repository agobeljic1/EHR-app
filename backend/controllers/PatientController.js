const { verifyNurseOrDoctor } = require("../utils/Auth");

module.exports = function (app, db) {
  const { Op } = db.Sequelize;

  app.get("/patients", verifyNurseOrDoctor, async (req, res) => {
    const { query } = req.query;
    const where = query
      ? {
          [Op.or]: [
            { id: { [Op.like]: `%${query}%` } },
            { given: { [Op.like]: `%${query}%` } },
            { family: { [Op.like]: `%${query}%` } },
          ],
        }
      : {};

    db.patient
      .findAll({
        attributes: [
          "id",
          "given",
          "family",
          "birthDate",
          "gender",
          "line",
          "city",
          "country",
        ],
        where,
      })
      .then((patients) => {
        res.json({ patients });
      })
      .catch(() => {
        res.status(500).json({ error: "Failed to fetch patients" });
      });
  });

  app.post("/patients", verifyNurseOrDoctor, async (req, res) => {
    const { given, family, birthDate, gender, line, city, country } = req.body;

    const newPatient = {
      given,
      family,
      birthDate,
      gender,
      line,
      city,
      country,
    };
    db.patient
      .create(newPatient)
      .then(({ dataValues: patient }) => {
        res.status(201).json({ patient });
      })
      .catch((e) => {
        console.log(e);
        res.status(409).json({ error: "Failed to create the patient" });
      });
  });

  app.put("/patients", verifyNurseOrDoctor, (req, res) => {
    const { id, given, family, birthDate, gender, line, city, country } =
      req.body;

    db.patient
      .update(
        {
          given,
          family,
          birthDate,
          gender,
          line,
          city,
          country,
        },
        { where: { id } }
      )
      .then((patient) => {
        res.status(204).json({ patient });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({ error: "Failed to update patient" });
      });
  });

  app.delete("/patients/:id", verifyNurseOrDoctor, (req, res) => {
    const { id } = req.params;
    db.patient
      .destroy({ where: { id } })
      .then(() => {
        res.status(200).json({ success: true });
      })
      .catch(() => {
        res.status(500).json({ error: "Failed to delete patient" });
      });
  });
};
