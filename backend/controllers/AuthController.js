var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { createAccessAndRefreshTokens } = require("../utils/Auth");

module.exports = function (app, db) {
  app.post("/signup", async (req, res) => {
    const { given, family, birthDate, emailAddress, password } = req.body;
    try {
      const hash = await bcrypt.hash(password, 10);

      const newUser = {
        given,
        family,
        birthDate,
        emailAddress,
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

  app.post("/login", async (req, res) => {
    const { emailAddress, password } = req.body;
    try {
      const { dataValues: user } = await db.user.findOne({
        where: { emailAddress },
      });
      if (!user) {
        throw new Error();
      }
      const passwordsEqual = await bcrypt.compare(password, user.password);
      if (passwordsEqual) {
        const { password, ...userWithoutPassword } = user;

        const { accessToken, refreshToken } =
          createAccessAndRefreshTokens(userWithoutPassword);
        res.cookie("ehrapp", refreshToken, {
          path: "/refresh",
          httpOnly: true,
        });
        res.status(200).json({ accessToken });
      } else {
        res.status(401).send({ error: "Password not valid" });
      }
    } catch (e) {
      return res.status(401).json({ error: "Email address not valid" });
    }
  });

  app.get("/refresh", async (req, res) => {
    const refreshToken = req.cookies?.ehrapp;
    if (!refreshToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, jwtUser) => {
          if (err) {
            throw new Error();
          }
          const { exp, iat, ...user } = jwtUser;
          const { accessToken, refreshToken } =
            createAccessAndRefreshTokens(user);
          res.cookie("ehrapp", refreshToken, {
            path: "/refresh",
            httpOnly: true,
          });
          res.status(200).json({ accessToken });
        }
      );
    } catch (e) {
      return res.status(401).json({ error: "Failed to create token" });
    }
  });

  app.post("/logout", async (req, res) => {
    res.clearCookie("ehrapp", { path: "/refresh", httpOnly: true });
    return res.status(200).json({ success: true });
  });
};
