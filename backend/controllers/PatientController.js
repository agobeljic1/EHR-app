const { verifyNurseOrDoctor } = require("../utils/Auth");

module.exports = function (app, db) {
  const { Op } = db.Sequelize;

  app.get("/patients", verifyNurseOrDoctor, async (req, res) => {
    const { query, organizationId } = req.query;
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
          "organizationId",
        ],
        where: { ...where, organizationId },
      })
      .then((patients) => {
        res.json({ patients });
      })
      .catch(() => {
        res.status(500).json({ error: "Failed to fetch patients" });
      });
  });

  app.post("/patients", verifyNurseOrDoctor, async (req, res) => {
    const { organizationId } = req.query;
    const { given, family, birthDate, gender, line, city, country } = req.body;

    const newPatient = {
      given,
      family,
      birthDate,
      gender,
      line,
      city,
      country,
      organizationId,
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
      .catch((e) => {
        console.log(e);
        res.status(500).json({ error: "Failed to delete patient" });
      });
  });
};

// const { id } = req.user;

//     const fetchOrganizationsForUserQuery = `SELECT Organization.id, Organization.name, Organization.line, Organization.city, Organization.country from Organization, UserOrganization where UserOrganization.userId = ${id} AND UserOrganization.organizationId = Organization.id`;
//     const fetchOrganizationsForUser = db.sequelize.query(
//       fetchOrganizationsForUserQuery,
//       {
//         type: db.Sequelize.QueryTypes.SELECT,
//       }
//     );
//     const fetchProfileInfo = db.user
//       .findOne({
//         attributes: [
//           "id",
//           "given",
//           "family",
//           "birthDate",
//           "emailAddress",
//           "role",
//           "selectedOrganizationId",
//         ],
//         where: {
//           id,
//         },
//       })
//       .then((resp) => {
//         if (!resp?.dataValues) {
//           throw new Error();
//         }
//         return resp.dataValues;
//       });

//     Promise.all([fetchProfileInfo, fetchOrganizationsForUser])
//       .then(([user, organizations]) => {
//         const finalUser = {
//           ...user,
//           organizations,
//         };
//         res.json({ user: finalUser });
//       })
//       .catch(() => {
//         res.status(500).json({ error: "Failed to fetch user" });
//       });
