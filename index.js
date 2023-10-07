// const http = require('http')

// http.createServer((req,res) => {
//     res.writeHead(200,{'Content-Type' : 'text/html'})
//     res.write('<h1>Hello Guys</h1>')
//     res.end()
// }).listen(3000,() => {
//     console.log('Server is running on 3000')
// })


// const http = require('http');

// Create an HTTP server
// const server = http.createServer((request, response) => {
//   // Set the response header to indicate plain text
//   response.setHeader('Content-Type', 'text/plain');

//   // Check the request URL and respond accordingly
//   if (request.url === '/hello') {
//     response.write('Hello, World!');
//   } else if (request.url === '/greet') {
//     response.write('Greetings from the server!');
//   } else {
//     response.write('Invalid path. Please visit /hello or /greet.');
//   }

//   // End the response
//   response.end();
// });

// // Start the server on port 3000
// const port = 3000;
// server.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });



const express = require('express');
const path = require('path');

const app = express();
const staticPath = path.join(__dirname,'public')
console.log(staticPath,'')

app.use(express.static(staticPath))

app.get('',(req,res) => {
  res.send('I am Root Page')
})

app.get('/home',(req,res) => {
  res.set({'Content-Type' : 'text/html'})
  res.send(path.join(staticPath + '/home.html'))
})

app.get('*' ,(req,res) => {
  res.sendFile(`${__dirname}\\public\\404.html`)
})
 
app.listen(3001,() => {
  console.log('Server is up and running on Port 3001')
})
