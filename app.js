const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const AWS = require('aws-sdk');
const uploadRoutes = require('./routes/uploadRoutes.js');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Added for the S3 upload route
app.use('/api', uploadRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to CapStone!");
});

app.get("*", (req, res) => {
    res.status(404).json({ success: false, data: { error: "Page is not found!" } });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, data: { error: 'Internal Server Error' } });
});

module.exports = app;
