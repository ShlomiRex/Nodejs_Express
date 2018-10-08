const express = require("express");
const router = express.Router();
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mywebsite");

router.get("/", (req, res, next) => {
    res.status(200);
    res.json({
        message: "Handling GET request to /geo"
    });
});

router.post("/", (req, res, next) => {

    let lat = req.query.lat;
    let lon = req.query.lon;

    if(lat == null || lon == null) {
        res.status(403);
        res.json({
            message: "Handling POST request to /geo.",
            error: "lat or lon attributes undefined/null."
        });
    } else {
        res.status(200);
        res.json({
            message: "Handling POST request to /geo.",
            success: "Good query",
        });
    }
    mongoose.connection.collection("geo").insert({
        lat: lat,
        lon: lon,
        comment: "This was inserted via POST method in localhost:8000/api/geo"
    });

    console.log("Sent");
});


module.exports = router;