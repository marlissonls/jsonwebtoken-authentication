require('dotenv/config');
const express = require("express");
const { Pool } = require('pg');
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken')

const app = express();
app.use(express.json());
app.use(cookieParser());
port = 3000;

/* app.use('/', express.static('front/login')) */
app.use('/registration', express.static('front/registration'))
app.use('/main', authorization, express.static('front/main'))

const pool = new Pool({
    user:       process.env.USER,       //  user:       'postgres',
    password:   process.env.PASSWORD,   //  password:   'postgres',
    host:       process.env.HOST,       //  host:       '10.0.0.108',
    port:       process.env.PORT,       //  port:       5432,
    database:   process.env.DATABASE,   //  database:   'cadastro',
    max:        process.env.MAX         //  max:        20
});

const SECRET = 'developer';
const blacklist = [];

function authorization(req, res, next) {
    const token = req.cookies.access_token;
    if(!token) {
        return res.sendStatus(403);
    }
    try {
        const data = jwt.verify(token, "YOUR_SECRET_KEY");
        req.userId = data.id;
        req.userRole = data.role;
        return next();
    } catch {
        return res.sendStatus(403);
    }
};

app.get("/", (req, res) => {
    const token = jwt.sign({ id: 7, role: "captain" }, "YOUR_SECRET_KEY");
    return res
            .cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            })
            .status(200)
            .json({ message: "Logged in successfully 😊 👌" });
});

app.get("/main", authorization, (req, res) => {
    return res.json({ user: { id: req.userId, role: req.userRole } });
});

app.get("/logout", authorization, (req, res) => {
    return res
            .clearCookie("access_token")
            .status(200)
            .json({ message: "Successfully logged out 😏 🍀" })
});

app.listen(port, () => {
    console.log(`Api running at http://localhost:${port}`);
});