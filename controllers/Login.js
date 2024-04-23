const { render } = require("ejs");
const { db } = require("../models/db.js");


const Login = (req, res) => {
  res.render("login");
};
const signup = (req, res) => {
  res.render("register");
};
const Logout = (req, res) => {
  req.logout((err)=>{
    if(err){ res.sendStatus(500) }
    else{ res.redirect("/login") }
  });
};

const Register = (req, res) => {
  const user = db.query( "SELECT COUNT(*) FROM users where UID = ?", [req.body.username],
    (err, result) => {
      if (err) {
        res.sendStatus(500).send(err);
      }
      if (result[0]["COUNT(*)"] > 0) {
        res.status(409).render("register", {
          message: "User already exists",
        });
      } 
      else {
        const { name, username, password } = req.body;
        db.query(
          "INSERT INTO users (UID,Name,pswd) VALUES (?,?,?)",
          [username, name, password],
          (err, result) => {
            if (err) {
              // res.sendStatus(500)
              res.status(403).render("register", {
                message: "An error occurred while registering the user",
              });

            } else {
              res.status(200).render("login", {
                message: "User registered successfully",
                });
            }
          }
        );
      }
    }
  );
};


module.exports = {
  Login,
  signup,
  Logout,
  Register,
};
