//Importar y configurar express y CORS
var express = require("express");
var cors = require('cors')

var app = express();
var port = 3000;

app.use(cors())
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log("Server listening on port " + port);
});

//Conexión con MongoDB
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var url = "mongodb+srv://lmvasquezg:admin@cece-bxu9d.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(url, { dbName:'Cece',useNewUrlParser: true, useUnifiedTopology: true });

//Especificacioens de datos a recibir y enviar
var data = new mongoose.Schema({
    MAC: {
        type: String,
        required: true
    },
    temp: {
        type: Number,
        required: true
    },
    hum: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    date:{
        type:Date,
        required:true
    }
},{collection:'Data'});

var registry = mongoose.model("Data", data);

//Metodo para agregar datos
app.post("/add", (req, res) => {
    console.log('Post')
    var myData = new registry(req.query);
    myData.save()
        .then(item => {
            res.send("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
})

//Metodo para obtener todos los datos
app.get("/getinfo", (req, res) => {    
    console.log('Get');
    registry.find({}, function(err, result) {
        if (err) throw err;
        if (result) {
            res.json(result)
        } else {
            res.send(JSON.stringify({
                error : 'Error'
            }))
        }
    });
});