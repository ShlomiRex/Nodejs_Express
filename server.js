let express  = require("express");
let app = express();
var mongoClient = require('mongodb').MongoClient;
var $ = require("jquery");



const mongodb_uri = "mongodb+srv://Admin:Admin@cluster0.mongodb.net";
const mongodb_comments_db = "mywebsite";
const mongodb_comments_collection = "global_comments";


function send_message(user, message) {
    // Connect to the db
    mongoClient.connect(mongodb_uri, (err, db) => {
        if(err) 
            throw err;
        let mywebsite_db = db.db(mongodb_comments_db);
        let global_messages_collection = mywebsite_db.collection(mongodb_comments_collection);
        let doc = {user: user, message: message};
        global_messages_collection.insertOne(doc, (err, res)=>{
            if(err) 
                throw err;
            console.log("1 document inserted");
            db.close();
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
    mongoClient.connect(mongodb_uri, (err, db) => {
        if(err) 
            throw err;
        let mywebsite_db = db.db(mongodb_comments_db);
        let global_messages_collection = mywebsite_db.collection("global_messages");
        let messages = global_messages_collection.find().limit(10).toArray((error, result) => {
            res.json(result);
        });
    });
});


app.use((req, res, next)=>{
    var error404 = new Error("ERROR 404: NOT FOUND: " + req.url);
    error404.status = 404;
    next(error404);
});


app.listen(8080, ()=>{console.info("Server has started on " + 8080)});