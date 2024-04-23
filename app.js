const express = require("express");
const app = express();
const database = require("./controllers/database");
const Home = require("./controllers/Home");
const Login = require("./controllers/Login");
const Books = require("./controllers/Books");
const passport = require("passport");
const {initializePassport, isAuthenticated} = require("./passportConfig");
const expressSession = require("express-session");

database.connect();

initializePassport(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(expressSession({secret:"secret", resave: false, saveUninitialized: false, cookie: {maxAge: 1000*60*60*24*7}}));
app.use(passport.initialize());
app.use(passport.session());


app.set("view engine", "ejs");
app.set("views", "src/");

app.listen(3000);

app.get("/", isAuthenticated, Home.Home);

app.get("/login", Login.Login);
app.get("/signup", Login.signup);
app.get("/logout", Login.Logout);


app.get("/books", isAuthenticated, Books.AllBooks);
app.get("/books/borrowed", isAuthenticated, Books.BorrowedBooks);

app.post("/books/borrow/", isAuthenticated, Books.BorrowBook);
app.post("/books/return/", isAuthenticated, Books.ReturnBook);


app.post("/query", isAuthenticated, database.query);
app.post("/register", Login.Register);
app.post("/login", passport.authenticate("local", {failureRedirect: "/login", successRedirect: "/"}));
