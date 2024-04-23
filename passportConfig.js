const LocalStrategy = require("passport-local").Strategy;
const { db } = require("./models/db.js");

exports.initializePassport = (passport) => {
  passport.use(
    new LocalStrategy(function (username, password, done) {
      const user = db.query(
        "SELECT * FROM users where UID = ?",
        [username],
        (err, result) => {
          if (err) {
            return done(err);
          }
          if (result.length > 0) {
            if (result[0].pswd == password) {
              return done(null, result[0]);
            } else {
              return done(null, false);
            }
          } else {
            return done(null, false);
          }
        }
      );
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.UID);
  });

  passport.deserializeUser(function (id, done) {
    const user = db.query(
      "SELECT * FROM users where UID = ?",
      [id],
      (err, result) => {
        if (err) {
          return done(err);
        }
        if (result.length > 0) {
          return done(null, result[0]);
        } else {
          return done(null, false);
        }
      }
    );
  });
};
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};
