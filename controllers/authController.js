const path = require("path");
const db = require(path.join(__dirname, "..", "database", "database.js"));
const bcrypt = require("bcryptjs");

function requireAuth(req, res, next) {
    if (!req.session.userId) {
        return res.redirect("/auth/login");
    }

    next();
}

function showLogin(req, res) {
    res.sendFile(path.join(__dirname, "..", "views", "login.html"));
}

async function login(req, res) {
    const { username, password } = req.body;

    const user = db.prepare(`
        SELECT * FROM users WHERE username = ?  
    `).get(username);

    if (!user) {
        return res.status(401).send("Invalid username or password");
    }

    const passwordMatch = await bcrypt.compare (
        password,
        user.hash
    );

    if (!passwordMatch) {
        return res.status(401).send("Invalid username or password");
    }

    req.session.userId = user.id;

    res.redirect("/");
}

function showRegister(req, res) {
    res.sendFile(path.join(__dirname, "..", "views", "register.html"));
}

async function register(req, res) {
    const { username, password, confirm } = req.body;


    const user = db.prepare(`
        SelECT * FROM users WHERE username = ?
    `).get(username);

    if (user) {
        return res.status(401).send("Invalid credentials, user already exists")
    }

    if (password !== confirm) {
        return res.status(401).send("Invalid credential, password must be equals to confirm")
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.prepare(`
        INSERT INTO users(username, hash) VALUES(?, ?)
    `).run(username, hashedPassword);

    res.redirect("/auth/login");
}

function showProfile(req, res) {
    res.sendFile(path.join(__dirname, "..", "views", "index.html"))
}

function logout(req, res) {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Could not logout")
        }

        res.clearCookie("connect.sid");
        res.redirect("/auth/login");
    })
}

module.exports = {
    requireAuth,
    showLogin,
    login,
    showRegister,
    register,
    showProfile,
    logout
};