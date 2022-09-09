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
    db.organization
      .destroy({ where: { id } })
      .then(() => {
        res.status(200).json({ success: true });
      })
      .catch(() => {
        res.status(500).json({ error: "Failed to delete organization" });
      });
  });
};
