const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8180;
const path = require('path');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('./index')
})
app.use('/', router);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('views', path.join(__dirname,'src/views'));
app.use(express.static(path.join(__dirname,'./public')))
app.set('view engine','ejs')

app.listen(port)
console.log(`Servidor rodando na porta ${port}`);