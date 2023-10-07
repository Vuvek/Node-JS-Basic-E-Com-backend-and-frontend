const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Hello</h1>");
    res.end();
  } else if (req.url == "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>About</h1>");
    res.end();
  } else if (req.url == "/api") {
    const jsonData = {
      id: 2,
      firstName: "Vivek",
      lastName: "Kumar",
      city: "Ghaziabad",
      age: 24,
    };

    const stringifyData = JSON.stringify(jsonData)

    const writeableStream = fs.createWriteStream("./read.csv", {
      encoding: "utf-8",
      flags: "a",
    });
    writeableStream.write(`${stringifyData}\n`, (err) => {
      if (err) {
        console.log("Error occured while writting");
      } else {
        console.log("Data");
        // res.writeHead(200,{'Contenty-Type' : 'application/json'})
        fs.writeFile('./read.csv',`${stringifyData}\n`,{flag:'a',encoding : 'utf-8'},(err) => {
            if(err) {
                console.log('Error has been occured : ',err)
            } else {
                console.log('Data Written Successfully')
            }
        })
        const fileStream = fs.createReadStream(__dirname + '/read.csv')
        fileStream.pipe(res)
        fileStream.on('end', () => {
            res.end()
        })
      }
    });

    // fs.writeFile('./read.csv',`${stringifyData}\n`,{flag:'a',encoding : 'utf-8'},(err) => {
    //     if(err) {
    //         console.log('Error has been occured : ',err)
    //     } else {
    //         console.log('Data Written Successfully')
    //     }
    // })

    // res.writeHead(200,{'Contenty-Type' : 'application/json'})
    // res.write(stringifyData)
    // res.end()

    // res.writeHead(200,{'Contenty-Type' : 'text/html'})
    // const data = fs.readFileSync('./read.csv',{encoding : 'utf-8'})
    // res.write(`<h1>${data}</h1>`)
    // res.end()

    // fs.readFile('./read.csv',{encoding : 'utf-8'},(err, data) => {
    //     if(err) {
    //         console.log("Error has been Occured : ",err)
    //     } else {
    //         res.write(`<h1>${'data'}</h1>`)
    //         res.end()
    //     }
    // })

    // const fileStream = fs.createReadStream(__dirname + '/read.csv')
    // fileStream.pipe(res)
    // fileStream.on('end', () => {
    //     res.end()
    // })
  } else {
    res.writeHead(400);
    res.write("<h1>Page Not Found</h1>");
    res.end();
  }
});

server.listen(3000, (err) => {
  if (err) {
    console.log("Something is wrong ");
  } else {
    console.log("Server is up and running on port : 3000");
  }
});
