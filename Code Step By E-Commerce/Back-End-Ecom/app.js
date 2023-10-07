import express from 'express'
import UserModal from './db-connection/modals/users.js'
import ProductModal from './db-connection/modals/product.js'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import cors from 'cors'
import Jwt  from 'jsonwebtoken'


import { signUpHandler, signInHandler, validateSession, logoutHandler } from './sesion-auth/session-auth-handler.js'

const app = express()
app.use(express.json())
app.use(helmet());
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:1234', credentials: true }))

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:1234'); // Replace with your React app's URL
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
//   });

// app.use(session({
//     key : "user_sid",
//     secret : "thisisrandmonstuff",
//     resave : false,
//     saveUninitialized: false,
//     cookie : {
//         expires : 600000
//     }
// }))

// app.use((req,res,next) => {
//     if(req.session.user && req.cookies.user_sid) {
//         res.redirect('/dashboard')
//     }
//     next()
// })


// var sessionChecker = (req,res,next) => {
//     if (req.session.user && req.cookies.user_sid) {
//         res.redirect('/dashboard')
//     } else {
//         next()
//     }
// }

app.set('port',3001)


const secretKey = 'vivekkumarkumarkumar';

function verifyToken (req,res,next) {
    console.log('middleware called',req.headers.authorization)
    let token = req.headers.authorization;
    if (token) {
        token = token.split(' ')[1]
        Jwt.verify(token,secretKey,(err,valid) => {
            if (err) {
                res.status(401).send({error : " Please Provide Valid Token with Header "})
            } else {
                next()
            }
        })
    } else {
        res.status(403).send({error : " Please Add Token with Header "})
    }
}

// app.get('/',sessionChecker,async (req,res) => {
//     const data = await productModal.find()
//     res.send(data)
// })


app.post('/signup',async (req,res) => {
    const userData = new UserModal(req.body)
    const data = await userData.save()
    console.log(data)
    res.send(data);
})
app.post('/signup-jwt',async (req,res) => {
    const userData = new UserModal(req.body)
    try {
        const data = await userData.save()
        Jwt.sign({ data },secretKey, {expiresIn : '2h'},(err,token) => {
            if (err) {
                res.send({data : 'User Not Found',error : 'User Not Found'})
            }
            res.send({data,jwt : token,error : null})
        })
    } catch (error) {
        res.send({data : 'User Not Found',error : 'User Not Found'})
    }

})
app.post('/signup-session',signUpHandler)

app.post('/login',signInHandler , async (req,res) => {
    if (req.body.email && req.body.password) {
        const user = await UserModal.findOne(req.body).select('-password')
        if (user) {
            res.send({user,error : null})
        } else {
            res.send({status : 'User Not Found',error : 'User Not Found'})
        }
    } else {
        res.send({status : 'Please Enter Valid Email & Password',error : 'Please Enter Valid Email & Password'})
    }
})
app.post('/login-jwt' , async (req,res) => {
    if (req.body.email && req.body.password) {
        const user = await UserModal.findOne(req.body).select('-password')
        if (user) {
            Jwt.sign({ user },secretKey, {expiresIn : '2h'},(err,token) => {
                if (err) {
                    res.send({status : 'User Not Found',error : 'User Not Found'})
                }
                res.send({user,jwt : token,error : null})
            })
        } else {
            res.send({status : 'User Not Found',error : 'User Not Found'})
        }
    } else {
        res.send({status : 'Please Enter Valid Email & Password',error : 'Please Enter Valid Email & Password'})
    }
}) 

app.post('/login-session', signInHandler)

app.post('/addProduct',async (req,res) =>  {
    console.log('lajfdksadjlkfjsaflkakldfjaslkaddProduct',req.cookies)
    const {name, brand, price, category, userId} = req.body;
    if ( name && brand && price && category && userId) {
        const product = ProductModal(req.body)
        const SaveProduct = await product.save()
        res.send({SaveProduct,error : null});
    } else {
        res.send({status : 'Product Information is not Valid',error : 'Product Information is not Valid'})
    }
})

app.get('/getData',validateSession , async (req,res) => {    
    const productData = await ProductModal.find()
    if (productData) {
        res.send({data : productData,error : null})
    } else {
        res.send({data : null, error : "Something is wrong"})
    }
})

app.get('/getProductById/:id' , async (req,res) => {
    try {
        const product = await ProductModal.findById(req.params.id)
        res.send({data : product , error : null})
    } catch (error) {
        res.send({data : null , error : "Something is Wrong"})
    }
})

app.put('/updateProductById/:id',async (req,res) => {
    console.log('runinningigngingigngingngigjgigngingig')
    console.log('lajfdksadjlkfjsaflkakldfjaslkaddProduct',req.cookies)
    try {
        const updatedProduct = await ProductModal.updateOne({_id : req.params.id} , {$set : req.body})
        res.send({"status" : updatedProduct , "error" : null})
    } catch (error) {
        console.log(error,'eroorrorororo')
        res.send({"status" : error , "error" : error})
    }
})

app.delete('/logout-session',logoutHandler)

app.delete('/:id',validateSession,async (req,res) => {
    try {
        const deletedProduct = await ProductModal.deleteMany({_id : req.params.id})
        res.send({"status" : deletedProduct,error : null})
    } catch (error) {
        res.send({"status" : "Something is Wrong",error : "Something is Wrong"})
    }
})

app.get('/search/:key',validateSession,async (req,res) => {
    try {
        const searchedProduct = await ProductModal.find({"$or" : [
            {
                name : {$regex : req.params.key},
            },
            {
                brand : {$regex : req.params.key}
            }
        ]});
        res.send({data : searchedProduct,error : null});
    } catch (error) {
        res.send({data : null, error : "Something is Wrong over here"})
    }   
})

app.listen(app.get('port'),(err) => {
    if (err) throw Error('Something is Wrong')
    console.log('Server is Up and running',3001)
})
