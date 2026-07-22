const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to PostgreSQL (Railway)
const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

db.connect()
    .then(() => {
        console.log("Connected to PostgreSQL.");
    })
    .catch((err) => {
        console.error("Failed to connect to PostgreSQL:", err);
    });

// Home route
app.get("/", (req, res) => {
    res.send("Hello from the VATREX backend!");
});

// Checkout route
app.post("/checkout", async (req, res) => {

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

    try {

        await db.query(
            `INSERT INTO "order-list" (
                fullname,
                email,
                phone,
                governorate,
                city,
                street,
                apartment,
                postal,
                productid,
                productname,
                productprice,
                shippingPrice,
                totalPrice
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
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
                req.body.product.price,
                req.body.shippingPrice,
                req.body.totalPrice
            ]
        );

        res.json({
            success: true,
            message: "Order saved successfully!"
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Database error");
    }

});

// View all orders
app.get("/orders", async (req, res) => {

    const adminKey = req.headers["x-admin-key"];

    if (adminKey !== process.env.ADMIN_KEY) {
        return res.status(401).send("Unauthorized");
    }

    try {

        const result = await db.query(
            "SELECT * FROM order-list ORDER BY id DESC"
        );

        res.json(result.rows);

    } catch (err) {

        console.error(err);
        res.status(500).send("Database error");

    }

});

// Admin login
app.post("/admin/login", (req, res) => {

    const { password } = req.body;

    if (password === process.env.ADMIN_KEY) {
        return res.json({
            success: true,
            message: "Login successful"
        });
    }

    res.status(401).json({
        success: false,
        message: "Wrong password"
    });

});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});