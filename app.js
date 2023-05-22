const express=require("express");
const session=require("express-session");
const passport = require("passport");
require("./auth");
const app = express();
app.use(session({ secret: "secret" }));
app.use(passport.initialize()); 
app.use(passport.session()); //Analyse la session de la requete et recupere les donnees d'identification de l'utilisateur

app.get("/", (req, res) => {
  res.send('<a href="/gitlab">Log in with GitLab</a>');
});
const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

app.get("/gitlab", passport.authenticate("gitlab", { scope: ["read_user"] }));

app.get("/gitlab/callback",
  passport.authenticate("gitlab", {
    successRedirect: "/success",
    failureRedirect: "/failure",
  })
);

app.get("/failure", (req, res) => {
  res.send("Something went wrong. Please try again");
});
app.get("/success", isLoggedIn  , (req, res) => {
    res.send(`
    ${JSON.stringify(req.user)}
    <a href="/logout">Logout</a>`);
  });
app.get("/logout", (req, res) => {
    req.session.destroy();
    req.logout(()=>console.log("test"));
    res.send("You are now logged out!");
  });

app.listen(3000);
