const express = require('express')
const path = require('path')
const ejs = require('ejs')
const ageAuthMiddleware = require('./middleware/ageAuth')

const app = express();
const route = express.Router();
// route.use(ageAuthMiddleware);

const staticPath = path.join(__dirname,'public');
app.use(express.static(staticPath));
app.set('view engine','ejs');
// app.use(ageAuthMiddleware);

app.get('',(req,res) => {
    res.sendFile(`${staticPath}\\home.html`)
})

route.get('/home',(req,res) => {
    let data = {name : 'Vivek Kumar',qualification : 'B.Tech',aspirant : 'Enterepreneurship',age : 24,languages: ['c','c++','js','node.js','python']};
    res.render('home',{data});
}) 

route.get('/contact',(req,res) => {
    res.send('Welcome to contact us page')
})

app.use('/',route)

app.listen(3000,(err) => {
    if(err) {
        console.log('Server is not running ')
    }else {
        console.log('Server is up and running on port 3000')
    }
})