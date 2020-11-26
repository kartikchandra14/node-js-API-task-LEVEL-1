var express = require('express');
var bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/my_db";
port = process.env.PORT || 3000;

var app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var data = require('./movies.js');

// app.use('/',(req, res) => {
//     console.log('Hello World');
//     // return 'HELLO WELCOME'
//     res.status(200);
//     res.json({message: "HELLO WORLD",Details: { message: 'API HELLO !!'}});
// });

app.use('/insertCandidate',(request, response) => {
    console.log('==============insertCandidate======>', request);
    if(request.body == {} && !request.body ){
        response.status(400);
        response.json({message: "Bad Request",Details: { error: 'request body not found !!'}});
    }else{
        let obj ={
            name: request.body.name,
            email: request.body.email
        }
        mongoClient.connect(url, function(err,client){
            if(err){
                console.log('error ==>', err);
            }else{
                console.log('connected to DB==>', url);
                let db = client.db('my_db');
                console.log('my_db ==>', db);
                let collection = db.collection('candidate');

                collection.insert([obj] ,function(err, res){
                    if(err){
                        console.log('error ==>',err);
                        response.status(400);
                        response.json({message: "Error",Details: { error: 'Error MESSAGE'}});
                    }else{
                        console.log('%d docs inserted', res.insertedCount);
                        response.status(200);
                        response.json({message: "Data Saved",Details: { message: 'success!!'}});
                    }
                    client.close();
                });
            }
        } 
        );
    }
    // .catch(error => {
    //     if (error instanceof CustomErrorService) {
    //       res.status(error.metadata && error.metadata.error.code)
    //         .send(error);
    //     }
    //   });
});
app.use('/movies',data);

app.listen(port, () => {
    console.log('app listening at PORT' + port)
});
