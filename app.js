const { geraSessao } = require("./src/services/login");
const express = require("express");
const session = require("express-session");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json())
app.use(session({secret:geraSessao()}))

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
// app.engine("html", require("ejs").renderFile);

app.engine('ejs', require('ejs').__express);
app.set('view engine','ejs'); 
var path = require ('path');
app.use(express.static(('../public')));
app.use(express.static("."));

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            
   optionSuccessStatus:200,
}
app.use(cors(corsOptions))


app.get('/', (req, res) => {
    res.redirect('/login');
  });

const rotaLogin = require("./src/routes/login")
app.use('/login', rotaLogin);

const rotaMovieFlix = require("./src/routes/movieflix")
app.use('/movieflix', rotaMovieFlix);


const port= 8000;
app.listen(port, ()=> {
    console.log(`Escutando na porta ${port}`)
})