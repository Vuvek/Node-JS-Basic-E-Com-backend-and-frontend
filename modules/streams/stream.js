const fs = require('node:fs')
const zlib = require('node:zlib')

const gzip = zlib.createGzip()

const readableStream = fs.createReadStream('./file1.txt', {
    encoding : 'utf-8',
    highWaterMark:2,    
})


readableStream.pipe(gzip).pipe(fs.WriteStream('./file3.txt.gz'))

const writeAbleStream = fs.createWriteStream('./file2.txt',{
    encoding:'utf-8'
})

// readableStream.pipe(writeAbleStream)

// readableStream.on("data",(chunk) => {
//     console.log(chunk)
//     // Here is chunk is entire file content because the buffer streams use has default size of 64kb, 
//     // therefore we can set to highWaterMark 2bytes, we are not seeing benefit with small size files. 
//     // when we have large files size (megha bytes) then streaming the data from one file to another will save lots of time & memory.
//     writeAbleStream.write(chunk)

// })