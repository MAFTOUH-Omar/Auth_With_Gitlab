const passport = require("passport"); 
const GitLabStrategy = require("passport-gitlab2") 
passport.use(
    new GitLabStrategy(
      {
        clientID: "Your Client ID",
        clientSecret: "Your Secret Key",
        callbackURL: "http://localhost:3000/gitlab/callback"
      },
      function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
      }
    )
  );
 passport.serializeUser(function (user, cb) {
    cb(null, user);
  });
 passport.deserializeUser(function (user, cb) {
    cb(null, user);
  }); 