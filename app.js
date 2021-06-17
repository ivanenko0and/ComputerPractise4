
const express = require("express");
const expressHbs = require("express-handlebars");
const hbs = require("hbs");
const app = express();

app.use(express.static('css'));


app.engine("hbs", expressHbs(
    {
        layoutsDir: "views/layouts", 
        defaultLayout: "layout",
        extname: "hbs"
    }
))

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");




const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const urlencodedParser = bodyParser.urlencoded({extended: true });

const fs = require('fs');
const child_process = require('child_process');

app.use(express.urlencoded());
app.use(express.json());



app.post('/dir', urlencodedParser, function(request, response){
    if(!request.body) return response.sendStatus(400); 
    
    var result = request.body.email.match(/.+@.+\..+/);
    
    if(result != null){
        console.log(request.body.email);
        response.send(`Success! <br> ${request.body.email} <br>`);
    }else{
        
        
        var workerProcess = child_process.exec('cmd /c chcp 65001>nul && dir', function(error, stdout) {
            console.log(String(stdout));
            response.send(String(stdout));
        });
         
    }
    
    
});

app.use("/", urlencodedParser, function(request, response){
    response.render("home.hbs");
});

app.listen(3000);

