// const http = require('node:http')
// const fs = require("node:fs");


// That is in between
const express = require('express');
const formidable = require('formidable');
const fs = require('node:fs');
const path = require('path');

const app = express();
const port = 3000;

app.post('/api/uploadFile', (req, res) => {
  const form = new formidable.IncomingForm()

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      res.status(500).json({ message: 'Error parsing form' });
      return;
    }

    const uploadedFile = files.fileInput;
    const originalFileName = uploadedFile.name;
    const filePath = path.join('uploads', originalFileName);

    // Check if a file with the same name already exists
    if (fs.existsSync(filePath)) {
      res.status(409).json({ message: 'File already exists' });
      return;
    }

    // Save the uploaded file to the destination directory
    fs.rename(uploadedFile.path, filePath, (renameErr) => {
      if (renameErr) {
        console.error('Error moving file:', renameErr);
        res.status(500).json({ message: 'Error moving file' });
        return;
      }

      res.json({ message: 'File uploaded successfully', file: originalFileName });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



// const server = http.createServer((req,res) => {
//     const name = 'Vivek';

// const superHero = {
//     firstName : 'Bruce',
//     lastName : 'Wayne'
// }
// res.writeHead(200,{'Content-Type' : 'application/json'})
// res.writeHead(200,{'Context-Type' : 'application/json'})
// res.write(JSON.stringify(html))
// res.end()

// let html = fs.readFileSync('./public/home.html','utf8')
// res.writeHead(200,{'Content-Type' : 'text/html'});
// html = html.replace('{{name}}',name)
// res.write(html);
// res.end();

// fs.readFile("./public/home.html", "utf8", (err, data) => {
//     if (err) {
//       console.log(err, "Error occured");
//     } else {
//       console.log("Read Succesfully");
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.write(data);
//       res.end();
//     }
//   });

// fs.createReadStream(__dirname + '/public/home.html').pipe(res)
//     res.end()
// })

// app.listen(3000, (err) => {
//   if (err) {
//     console.log("Error has been Occurred : ", err);
//   } else {
//     console.log("Server is Up and running on port : ", 3000);
//   }
// });
