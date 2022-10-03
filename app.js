require('dotenv/config');
const express = require("express");
const { Pool } = require('pg');
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken')

const app = express();
app.use(express.json());
app.use(cookieParser());
port = 3000;

app.use('/', express.static('front/login'))
app.use('/registration', express.static('front/registration'))
app.use('/main', authorization, express.static('front/main'))
app.use('/admin', authorization, express.static('front/admin'))

const pool = new Pool({
    user:       process.env.USER,
    password:   process.env.PASSWORD,
    host:       process.env.HOST,
    port:       process.env.PORT,
    database:   process.env.DATABASE,
    max:        process.env.MAX
});

const SECRET = process.env.SECRET;
const blacklist = []; // Falta analisar

function authorization(req, res, next) {
    const token = req.cookies.access_token;
    if(!token) {
        return res.sendStatus(403);
    }
    try {
        const data = jwt.verify(token, SECRET);
        req.userId = data.id;
        req.userRole = data.role;
        return next();
    } catch {
        return res.sendStatus(403);
    }
};

app.get("/login", async (req, res) => {
    const token = jwt.sign({ id: 7, role: "captain" }, SECRET);
    return res
            .cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            })
            .redirect('/main');
            /* .json({ message: "Logged in successfully 😊 👌" })
            .redirect('/main'); */
});

app.get("/main", authorization, (req, res) => {
    return res.json({ user: { id: req.userId, role: req.userRole } });
});

app.get("/logout", authorization, (req, res) => {
    return res
            .clearCookie("access_token")
            .redirect('/');
            /* .status(200)
            .json({ message: "Successfully logged out 😏 🍀" }) */
});

app.listen(port, () => {
    console.log(`Api running at http://localhost:${port}`);
});