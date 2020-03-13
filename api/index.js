const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");

const initializePassport = require("../passport-config");
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);

const users = [];


// CORS
if (process.env.NODE_ENV !== "production") {
    router.use((req, res, next) => {
        if (req.path !== '/' && !req.path.includes('.')) {
            res.header({
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': req.headers.origin || '*',
                'Access-Control-Allow-Headers': 'X-Requested-With',
                'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE',
                'Content-Type': 'application/json; charset=utf-8'
            })
        }
        next();
    })
}

router.get("/users", checkAuthenticated, (req, res) => {
    try {
        if (!req.user) return res.json({ message: "Failed" });
        res.json(req.user.name ? { message: "Success", value: req.user.name } : { message: "Failed" });
    } catch (e) {
        console.log(e.message)
        res.json({ message: "Error" });
    }
});

router.get("/signin*", checkNotAuthenticated);

router.post("/signin", checkNotAuthenticated, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log("Err1", err)
            return next(err);
        }
        if (!user) {
            return res.json(info.message);
        }
        req.logIn(user, loginErr => {
            if (loginErr) {
                console.log("Err2", loginErr)
                return next(loginErr);
            }
            return res.json("Success");
        });
    })(req, res, next);
});

router.get("/signup*", checkNotAuthenticated);

router.post("/signup", checkNotAuthenticated, async (req, res) => {
    const { name, email, password } = req.body;
    if (!name) return res.json("Failed")
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({
            id: Date.now().toString(),
            name,
            email,
            password: hashedPassword
        });
        res.json("Success");
    } catch {
        res.json("Error");
    }
    console.log(users);
});

router.delete('/signout', (req, res) => {
    req.logOut()
    res.json("Success")
})


router.use("*", (req, res) => res.json("No API found."));
// router.use("*", (req, res) => res.status(404).json("No API found."));

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.json({ message: "Error", code: "REROUTE", value: "/signin" });
}
function checkNotAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }

    res.json({ code: "REROUTE", value: "/" });
    // res.json({ message: "Error", value: "Is authenticated" });
}

module.exports = router;