let express  = require("express");
let fs = require("fs");
let app = express();




// Serve static HTML content
app.use(express.static("public")); 

app.get('/send_global_message', function (req, res) {
    let message = req.query.message;
    let user = req.query.user;
    if(message == null || user == null)
        res.status(400);
    else {
        res.status(200);
        let apend_msg = user + ":" + message + "\n";
        console.log("Appending " + apend_msg);
        fs.appendFile("messages_log.txt", apend_msg);
    }
    res.redirect("index.html");
})

app.listen(8080, ()=>{console.info("Server has started on " + 8080)});