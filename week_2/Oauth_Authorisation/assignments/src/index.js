const express = require("express");

const passport = require("./configs/passport");

const { register, login } = require("./controllers/auth.controller");
const productController = require("./controllers/product.controller");
const User = require("../src/models/user.model")

const app = express();

app.use(express.json());
app.use(passport.initialize());

passport.serializeUser(function ({ user, token }, done) {
    done(null, { user, token });
});

passport.deserializeUser(function ({ user, token }, done) {
    done(err, { user, token });
});

app.get("/auth/google/failure", function (req, res) {
    return res.send("Something went wrong");
});

app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/auth/google/failure",
    }),
    function (req, res) {
        const { user, token } = req.user;
        return res.status(200).json({ user, token });
    }
);

app.get("/", async (req, res) => {
  const user = await User.find({}).lean().exec();

  return res.status(200).json({ data: user });
});

app.post("/register", register);
app.post("/login", login);
app.use("/products", productController);

module.exports = app;
