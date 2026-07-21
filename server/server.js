const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database("database.db", (err) => {
    if (err) {
        console.error("Failed to connect to database:", err);
    } else {
        console.log("Connected to SQLite database.");
    }
});

// Create orders table
db.run(`
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullname TEXT,
    email TEXT,
    phone TEXT,
    governorate TEXT,
    city TEXT,
    street TEXT,
    apartment TEXT,
    postal TEXT,
    productId TEXT,
    productName TEXT,
    productPrice INTEGER
)
`, (err) => {
    if (err) {
        console.error("Error creating table:", err);
    } else {
        console.log("Orders table is ready.");
    }
});

// Home route
app.get("/", (req, res) => {
    res.send("Hello from the VATREX backend!");
});

// Checkout route
app.post("/checkout", (req, res) => {

    // Validation
    if (!req.body.fullname) {
        return res.status(400).send("Full name is required");
    }

    if (!req.body.email) {
        return res.status(400).send("Email is required");
    }

    if (!req.body.email.includes("@")) {
        return res.status(400).send("Invalid email address");
    }

    if (!req.body.phone) {
        return res.status(400).send("Phone number is required");
    }

    if (req.body.phone.length !== 11) {
        return res.status(400).send("Phone number must be 11 digits");
    }

    if (!req.body.product) {
        return res.status(400).send("Product information missing");
    }

    // Save order
    db.run(
        `INSERT INTO orders (
            fullname,
            email,
            phone,
            governorate,
            city,
            street,
            apartment,
            postal,
            productId,
            productName,
            productPrice
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            req.body.fullname,
            req.body.email,
            req.body.phone,
            req.body.governorate,
            req.body.city,
            req.body.street,
            req.body.apartment,
            req.body.postal,
            req.body.product.id,
            req.body.product.name,
            req.body.product.price
        ],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Database error");
            }

            res.json({
            success: true,
            message: "Order saved successfully!"
            });
        }
    );
});

// View all orders
app.get("/orders", (req, res) => {

    const adminKey = req.headers["x-admin-key"];

    if (adminKey !== process.env.ADMIN_KEY) {
        return res.status(401).send("Unauthorized");
    }

    db.all("SELECT * FROM orders", [], (err, rows) => {

        if (err) {
            console.error(err);
            return res.status(500).send("Database error");
        }

        res.json(rows);
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});