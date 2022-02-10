const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = 3003 || process.env.PORT;
const morgan = require('morgan');
const path = require('path');
var methodOverride = require('method-override');
const bodyParser = require('body-parser');
const route = require('./routes');
const db = require('./config/db');

// Set up static path
app.use(express.static(path.join(__dirname, 'public')));
// Connect to db
db.connect();
// Set ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'resources', 'views'));
// Set up dependency
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorizarion');
    next();
})
// Route Init
route(app);
// Connect Server
server.listen(PORT, () => {
    console.log("Connected Successfully");
})
