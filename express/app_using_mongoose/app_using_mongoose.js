import express from 'express'
import './modal/config.js'
import Product from './modal/Product.js'
import multer from 'multer'
import EventEmitter from 'node:events'

const app = express()
const port = 3000;
app.use(express.json())
const event = new EventEmitter()

let count = 0;
event.on('api_count',() => {
    count += 1;
    console.log('Api Count',count)
})


const upload = multer({
    storage : multer.diskStorage({
        destination : function(req,file,cb) {
            cb(null,'C:/Users/Bonami CTP/Desktop/Node Js Code Step by step/express/app_using_mongoose/uploads')
        },
        filename : function (req,file,cb) {
            cb(null,file.fieldname + "-" + Date.now() + '.jpg')
        }
    })
}).single('user_file')

app.post('/create',async (req,res) => {
    const data = Product(req.body)
    let result = await data.save()
    event.emit('api_count');
    res.send('Data is sent');
})

app.get('/getData',async (req,res) => {
    const data =await Product.find()
    res.send(data)
    console.log(data)
    event.emit('api_count');

})

app.put('/update/:id',async (req,res) => {
    const id = req.params.id;
    const updated = await Product.updateOne({name : 'note77'},{$set : req.body})
    console.log(updated)
    res.send(req.body)
})

app.delete('/delete/:_id',async (req,res) => {
    const deleted = await Product.deleteOne(req.params)
    res.send({status : 'Deleted Successfully'})
    console.log(deleted)
})

app.get('/search/:key', async (req,res) => {
    const key = req.params.key;
    const data = await Product.find({$or : [{
            name : {$regex : key},
            brand : {$regex : key}
        }]})
    console.log(data)
    res.send(data)
})

app.post('/upload',upload, async (req,res) => {
    res.send('Uploaded Seccessfully')
})

app.listen(port,() => {
    console.log('Your Server is up and running on port',port)
})

