const { verifyAdmin } = require("../utils/Auth");

module.exports = function (app, db) {
  app.get("/organizations", verifyAdmin, async (req, res) => {
    db.organization
      .findAll({
        attributes: ["id", "name", "line", "city", "country"],
      })
      .then((organizations) => {
        res.json({ organizations });
      })
      .catch(() => {
        res.status(500).json({ error: "Failed to fetch organizations" });
      });
  });

  app.get("/organizations/:id/users", verifyAdmin, async (req, res) => {
    const { id } = req.params;
    const fetchUsersFromOrganizationQuery = `SELECT User.id, User.given, User.family, User.birthDate, User.emailAddress, User.role, User.gender from User, UserOrganization where UserOrganization.organizationId = ${id} AND UserOrganization.userId = User.id`;

    const fetchUsersFromOrganization = db.sequelize.query(
      fetchUsersFromOrganizationQuery,
      {
        type: db.Sequelize.QueryTypes.SELECT,
      }
    );

    fetchUsersFromOrganization
      .then((users) => {
        res.json({ users });
      })
      .catch(() => {
        res.status(500).json({ error: "Failed to fetch organization users" });
      });
  });

  app.get("/organizations/:id", verifyAdmin, async (req, res) => {
    const { id } = req.params;
    const fetchOrganizationbyId = db.organization
      .findOne({
        attributes: ["id", "name", "line", "city", "country"],
        where: { id },
      })
      .then(({ dataValues: organization }) => organization);

    fetchOrganizationbyId
      .then((organization) => {
        res.json({ organization });
      })
      .catch(() => {
        res.status(500).json({ error: "Failed to fetch organization" });
      });
  });

  app.delete(
    "/organizations/:organizationId/users/:userId",
    verifyAdmin,
    (req, res) => {
      const { organizationId, userId } = req.params;
      db.userOrganization
        .destroy({ where: { organizationId, userId } })
        .then(() => {
          res.status(200).json({ success: true });
        })
        .catch(() => {
          res
            .status(500)
            .json({ error: "Failed to delete user from organization" });
        });
    }
  );

  app.post(
    "/organizations/:organizationId/users/:userId",
    verifyAdmin,
    (req, res) => {
      const { organizationId, userId } = req.params;
      db.userOrganization
        .findOrCreate({ where: { organizationId, userId } })
        .then(() => {
          res.status(200).json({ success: true });
        })
        .catch(() => {
          res.status(500).json({ error: "Failed to add user to organization" });
        });
    }
  );

  app.post("/organizations", verifyAdmin, (req, res) => {
    const { name, line, city, country } = req.body;
    db.organization
      .create({
        name,
        line,
        city,
        country,
      })
      .then((organization) => {
        res.status(201).json({ organization });
      })
      .catch(() => {
        res.status(400).json({ error: "Failed to create organization" });
      });
  });

  app.put("/organizations", verifyAdmin, (req, res) => {
    const { id, name, line, city, country } = req.body;

    db.organization
      .update(
        {
          name,
          line,
          city,
          country,
        },
        { where: { id } }
      )
      .then((organization) => {
        res.status(204).json({ organization });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({ error: "Failed to update organization" });
      });
  });

  app.delete("/organizations/:id", verifyAdmin, (req, res) => {
    const { id } = req.params;

    const deleteOrganizationUsers = db.userOrganization.destroy({
      where: {
        organizationId: id,
      },
    });
    const deleteOrganization = db.organization.destroy({ where: { id } });

    deleteOrganizationUsers
      .then(() => {
        deleteOrganization
          .then(() => {
            res.status(200).json({ success: true });
          })
          .catch((e) => {
            console.log(e);
            res.status(500).json({ error: "Failed to delete organization" });
          });
      })
      .catch(() => {
        res.status(500).json({ error: "Failed to delete organization" });
      });
  });
};
