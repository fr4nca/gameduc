const db = require("./db");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const keys = require("./keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.jwtsecret;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      try {
        db.query(
          "SELECT * FROM ALUNO where matricula = ? UNION SELECT * FROM PROFESSOR where matricula = ?",
          [payload.matricula, payload.matricula],
          (err, results, fields) => {
            if (err) {
              return done(err, false);
            }
            let user;
            if (results.length > 0) user = results[0];

            if (user) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          }
        );
      } catch (e) {
        console.log(e);
      }
    })
  );
};
