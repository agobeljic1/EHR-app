var bcrypt = require("bcrypt");
const { verifyAdmin } = require("../utils/Auth");

module.exports = function (app, db) {
  const { Op } = db.Sequelize;

  app.get("/users", verifyAdmin, async (req, res) => {
    const { query } = req.query;
    const where = query
      ? {
          [Op.or]: [
            { id: { [Op.like]: `%${query}%` } },
            { given: { [Op.like]: `%${query}%` } },
            { family: { [Op.like]: `%${query}%` } },
            { emailAddress: { [Op.like]: `%${query}%` } },
          ],
        }
      : {};

    db.user
      .findAll({
        attributes: [
          "id",
          "emailAddress",
          "given",
          "family",
          "birthDate",
          "gender",
          "line",
          "city",
          "country",
          "role",
        ],
        where,
      })
      .then((users) => {
        res.json({ users });
      })
      .catch(() => {
        res.status(500).json({ error: "Failed to fetch users" });
      });
  });

  app.post("/users", verifyAdmin, async (req, res) => {
    const {
      emailAddress,
      given,
      family,
      birthDate,
      gender,
      line,
      city,
      country,
      role,
    } = req.body;
    const { DB_DEFAULT_PASSWORD } = process.env;

    try {
      const hash = await bcrypt.hash(DB_DEFAULT_PASSWORD, 10);

      const newUser = {
        given,
        family,
        birthDate,
        emailAddress,
        gender,
        line,
        city,
        country,
        role,
        password: hash,
      };
      db.user
        .create(newUser)
        .then(() => {
          res.status(201).json({ success: true });
        })
        .catch(() => {
          res.status(409).json({ error: "Failed to create the user" });
        });
    } catch {
      res.status(500).json({ error: "Unexpected error" });
    }
  });

  app.put("/users", verifyAdmin, (req, res) => {
    const {
      id,
      emailAddress,
      given,
      family,
      birthDate,
      gender,
      line,
      city,
      country,
      role,
    } = req.body;

    db.user
      .update(
        {
          emailAddress,
          given,
          family,
          birthDate,
          gender,
          line,
          city,
          country,
          role,
        },
        { where: { id } }
      )
      .then((user) => {
        res.status(204).json({ user });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({ error: "Failed to update user" });
      });
  });

  app.delete("/users/:id", verifyAdmin, (req, res) => {
    const { id } = req.params;

    // const deleteUserOrganizations = db.userOrganization.destroy({
    //   where: {
    //     userId: id,
    //   },
    // });
    const deleteUser = db.user.destroy({ where: { id } });

    // deleteUserOrganizations
    //   .then(() => {
    deleteUser
      .then(() => {
        res.status(200).json({ success: true });
      })
      .catch(() => {
        res.status(500).json({ error: "Failed to delete user" });
      });
    // })
    // .catch(() => {
    //   res.status(500).json({ error: "Failed to delete user" });
    // });
  });
};
