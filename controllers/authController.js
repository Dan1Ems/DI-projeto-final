const path = require("path");
const db = require(path.join(__dirname, "..", "database", "database.js"));
const bcrypt = require("bcryptjs");

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
    const { username, password, confirmPassword } = req.body;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,20}$/;

    const user = db.prepare(`
        SelECT * FROM users WHERE username = ?
    `).get(username);

    if (user) {
        return res.status(401).send("Invalid credentials, user already exists");
    }

    if (!username) {
        return res.status(401).send("invalid crendetials, mut provide username");
    }

    if (!passwordRegex.test(password)) {
        return res.status(401).send("Invalid credentials, your password must be 8 - 20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.");
    }

    if (password !== confirmPassword) {
        return res.status(401).send("Invalid credentials, password must be equals to confirm");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.prepare(`
        INSERT INTO users(username, hash) VALUES(?, ?)
    `).run(username, hashedPassword);

    res.redirect("/auth/login");
}

function logout(req, res) {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Could not logout");
        }

        res.clearCookie("connect.sid");
        res.redirect("/auth/login");
    })
}

module.exports = {
    showLogin,
    login,
    showRegister,
    register,
    logout
};