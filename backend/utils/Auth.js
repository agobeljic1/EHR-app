const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.verifyTokenAndSetUser = function (req, res, next) {
  const authorizationHeader = req.headers?.authorization;
  const token = authorizationHeader && authorizationHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }
    req.user = user;
    next();
  });
};

module.exports.verifyAdmin = function (req, res, next) {
  if (!req.user?.admin) {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};

module.exports.checkUserIdAdminValidity = function (req, res, next) {
  const { userId } = req.body;
  if (!req.user?.admin && userId && userId !== req.user.id) {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};

module.exports.createAccessAndRefreshTokens = function (user) {
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5s",
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

module.exports.initializeDatabaseAdminUser = async function (db) {
  const {
    DB_DEFAULT_ADMIN_FIRST_NAME: firstName,
    DB_DEFAULT_ADMIN_LAST_NAME: lastName,
    DB_DEFAULT_ADMIN_BIRTH_DATE: birthDate,
    DB_DEFAULT_ADMIN_EMAIL_ADDRESS: emailAddress,
    DB_DEFAULT_ADMIN_PASSWORD: password,
  } = process.env;

  try {
    const hash = await bcrypt.hash(password, 10);

    const newUser = {
      firstName,
      lastName,
      birthDate,
      emailAddress,
      admin: true,
    };
    await db.user.findOrCreate({
      where: newUser,
      defaults: {
        password: hash,
      },
    });
    console.log("Successfully created default admin account");
  } catch (e) {
    console.log(e);
  }
};
