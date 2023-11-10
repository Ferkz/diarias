const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8180;
const host = '0.0.0.0'
const path = require('path');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('./index')
})
app.use('/', router);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('views', path.join(__dirname,'./views'));
app.use(express.static(path.join(__dirname,'../public')))
app.set('view engine','ejs')

app.listen(port,host)
console.log(`servidor rodando na porta http://${host}:${port}`);