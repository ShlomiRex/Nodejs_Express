const uri_localhost = "mongodb://localhost:27017";
const uri_atlas = "mongodb+srv://Admin:Admin@cluster0-0yi4f.mongodb.net/test?retryWrites=true";
const db_mywebsite = "comments";
const collection_global_comments = "global_comments";
function test_connection(uri) {

    // Connect using MongoClient
    MongoClient.connect(uri, function(err, client) {
        const collection = client.db(db_mywebsite);
        if(err) {
            throw err;
        }
        console.log("Connection is fine");
        client.close();
     });
}

function test_atlas_connection() {
    test_connection(uri_atlas);
}

function test_localhost_connection() {
    test_connection(uri_localhost);
}


module.exports = {
    uri_localhost,
    uri_atlas, 
    db_mywebsite,
    collection_global_comments,
    test_atlas_connection,
    test_localhost_connection
    
}