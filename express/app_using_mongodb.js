import express from "express";
import db from "./connections/connection_mongodb.js";
import mongodb from 'mongodb'

let port = 3000;
const app = express();
app.use(express.json());

app.get('/',async (req,res) => {
    await db.connect()
    const getData = await db.findAllData()
    res.send(getData)
}) 

app.post('/',async (req,res) => {
    await db.connect()
    const inserted = await db.insertOneRecord(req.body)
    console.log(inserted)
    console.log(req.body)
    res.send(req.body)
})

app.put('/:name',async (req,res) => {
    await db.connect();
    const name = req.params.name;
    const updated = await db.updateDocument({name : name},{$set : req.body});
    console.log(updated)
    console.log(req.body)
    res.send(req.body)
})

app.delete('/:id',async (req,res) => {
    await db.connect()
    const id = req.params.id;
    const deleted = await db.deleteDocument({_id: new mongodb.ObjectId(id)})
    console.log(deleted)
    res.send(200,{id : id,'response' : 'Deleted Successfully'})
})

app.listen(port,(err) => {
    if (err) {
        console.log('Error is Occured while Connecting',err)
    } else {
        console.log('Server is up and running on port ', port)
    }
})
