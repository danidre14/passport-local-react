const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");

const apiRouter = require("./api/index");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: "secretString", //use env vars over time
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/", apiRouter);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/dist"));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
    })
}

app.listen(5000);