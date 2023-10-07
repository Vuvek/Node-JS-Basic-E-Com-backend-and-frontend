import express from "express";
import connection from "./connection.js";

const app = express()
app.use(express.json())

app.get('/',(req,res) => {
    connection.query('Select * from users',(err,result) => {
        console.log(result)
        res.send(result)
    })
})

app.post('/',(req,res) => {
    const data = {name : 'moto edge 30 pro',brand : 'moto',price : '40000',category : 'mobile'}
    connection.query('Insert into users set ?',req.body,(err,result,fields) => {
        if ( err ) err;
        res.send(result);
    })
})


app.put('/:brand',(req,res) => {
    const data = [req.body.name , req.body.brand,req.params.brand];
    connection.query("Update users set name = ?,brand = ? where brand = ?",data,(err,results,fields) => {
        if (err) err;
        res.send(results)
    })
})

app.delete('/:brand',(req,res) => {
    connection.query(`DELETE FROM users WHERE brand = '${req.params.brand}'`,(err,result) => {
        if (err) console.log(err);
        connection.end();
        res.send(result);
    })
})

app.listen(3000)
