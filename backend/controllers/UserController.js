module.exports = function (app, db) {
  app.get("/me", async (req, res) => {
    const { id } = req.user;
    db.user
      .findOne({
        attributes: [
          "id",
          "given",
          "family",
          "birthDate",
          "emailAddress",
          "role",
        ],
        where: {
          id,
        },
      })
      .then((user) => {
        res.json({ user });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({ error: "Failed to fetch user" });
      });
  });
};
