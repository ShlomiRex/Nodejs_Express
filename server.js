const express  = require("express");
const app = express();
const $ = require("jquery");
const mongoose = require("mongoose"); 
const db_module = require("./db");
const MongoClient = require('mongodb').MongoClient;
    

function send_comment(user, message) {
    // Connect to the db
    MongoClient.connect(db_module.uri_atlas, (err, db) => {
        if(err) 
            throw err;
        let mywebsite_db = db.db(db_module.db_mywebsite);
        let global_messages_collection = mywebsite_db.collection(db_module.collection_global_comments);
        let doc = {user: user, message: message};
        global_messages_collection.insertOne(doc, (err, res)=>{
            if(err) 
                throw err;
            console.log("1 document inserted");
            db.close();
        });

    });
}

function recv_comments(response) {
    // Connect to the db
    MongoClient.connect(db_module.uri_atlas, (err, db) => {
        if(err) 
            throw err;
        let mywebsite_db = db.db(db_module.db_mywebsite);
        let global_messages_collection = mywebsite_db.collection(db_module.collection_global_comments);
        global_messages_collection.find().toArray((error, result) => {
            response.json(result);
        });
    });
}

// Serve static HTML content
app.use(express.static("public")); 

app.get('/send_global_message', function (req, res) {
    let message = req.query.message;
    let user = req.query.user;
    if(message == null || user == null) {
        res.status(400);
        res.send("user or message are null.");
    }
    else {
        res.status(200);
        let apend_msg = user + ":" + message + "\n";
        send_message(user, message);
        res.status(200);
        res.redirect("submited.html");
    }

});

app.get("/get_messages", (req, res) => {
    recv_comments(res);
});


app.use((req, res, next)=>{
    var error404 = new Error("ERROR 404: NOT FOUND: " + req.url);
    error404.status = 404;
    next(error404);
});


app.listen(8080, ()=>{console.info("Server has started on " + 8080)});