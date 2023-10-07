const fs = require('node:fs')
const stream = require('node:stream')

// create a readable stream from file1.txt (source)
const readableStream = fs.createReadStream('./file1.txt')

// create a writeable stream to file2.txt (destination)
const writeableStream = fs.createWriteStream('./file2.txt')

// create a transform stream to convert data to uppercase
const uppercaseTransform = new stream.Transform({
    transform(chunk,encoding,callback) {
        this.push(chunk.toString().toUpperCase())
        callback()
    }
})

// Chain the streams together: Read -> UpperCase -> Write 
readableStream.pipe(uppercaseTransform).pipe(writeableStream)


// Optional: Listen for the 'end' event to know when the data transfer is complete
writeableStream.on('end',() => {
    console.log('Data transfered Completed');
})

// Optional: Handle errors
readableStream.on('error',(err) => {
    console.log('Readable Stream Error : ',err)
})

writeableStream.on('error',(err) => {
    console.log('Writable Stream Error : ',err)
})

