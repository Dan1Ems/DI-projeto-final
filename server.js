require("dotenv").config();
const path = require("path");
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

const authRoutes = require(path.join(__dirname, "routes", "authRoutes.js"));
const profileRoutes = require(path.join(__dirname, "routes", "profileRoutes.js"));
const notesRoutes = require(path.join(__dirname, "routes", "notesRoutes.js"));
const homeRoutes = require(path.join(__dirname, "routes", "homeRoutes.js"));
const notesApiRoutes = require(path.join(__dirname, "routes", "api", "notesApiRoutes.js"));

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/notes", notesRoutes);
app.use("/home", homeRoutes);
app.use("/api/notes", notesApiRoutes);

app.use("/", () => {
    redirect("/auth/login");
});

app.listen(PORT, () => {
    console.log(`Server is runnig at http://localhost:${PORT}`);
});