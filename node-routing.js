const http = require('node:http')

const server = http.createServer((req,res) => {

    const superHero = {
        firstName : 'Bruce',
        lastName : 'Wayne'
    }

    if(req.url === '/') {
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write('<h1>This is Home Page </h1>')
    } else if(req.url === '/about') {
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write('<h1>This is About Page </h1>')
    } else if (req.url === '/contact') {
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write('<h1>This is Contact Us Page</h1>')
    } else if (req.url === '/api') {
        res.writeHead(200,{'Content-Type' : 'application/json'})
        res.write(JSON.stringify(superHero))
    }  else {
        res.writeHead(400)
        res.write('<h1>Page Not Found</h1>')
    }
    res.end()
})

server.listen(3000,(err) => {
    if (err) {
        console.log('Error Occured : ',err)
    } else {
        console.log('Your Server is Up and Running on Port : ',3000)
    }
})