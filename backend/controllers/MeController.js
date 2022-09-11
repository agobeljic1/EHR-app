const { verifyAdmin, verifyNurseOrDoctor } = require("../utils/Auth");

module.exports = function (app, db) {
  app.get("/me", async (req, res) => {
    const { id } = req.user;

    const fetchOrganizationsForUserQuery = `SELECT Organization.id, Organization.name, Organization.line, Organization.city, Organization.country from Organization, UserOrganization where UserOrganization.userId = ${id} AND UserOrganization.organizationId = Organization.id`;
    const fetchOrganizationsForUser = db.sequelize.query(
      fetchOrganizationsForUserQuery,
      {
        type: db.Sequelize.QueryTypes.SELECT,
      }
    );
    const fetchProfileInfo = db.user
      .findOne({
        attributes: [
          "id",
          "given",
          "family",
          "birthDate",
          "emailAddress",
          "role",
          "selectedOrganizationId",
        ],
        where: {
          id,
        },
      })
      .then(({ dataValues: user }) => user);

    Promise.all([fetchProfileInfo, fetchOrganizationsForUser])
      .then(([user, organizations]) => {
        const finalUser = {
          ...user,
          organizations,
        };
        res.json({ user: finalUser });
      })
      .catch(() => {
        res.status(500).json({ error: "Failed to fetch user" });
      });
  });

  app.patch("/me/organization", verifyNurseOrDoctor, (req, res) => {
    const { id } = req.user;
    const { selectedOrganizationId } = req.body;

    db.user
      .update(
        {
          selectedOrganizationId,
        },
        { where: { id } }
      )
      .then((user) => {
        res.status(204).json({ user });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({ error: "Failed to update user organization" });
      });
  });
};
