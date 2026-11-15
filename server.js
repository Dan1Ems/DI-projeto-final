require("dotenv").config();
const express = require("express");
const session = require("express-session");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60
    }

}))

const authRoutes = require("./routes/authRoutes");

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.redirect("/auth/login");
});

app.listen(PORT, () => {
    console.log(`Server is runnig at http://localhost:${PORT}`);
});