const fs = require('fs')

console.log('first')
const fileData = fs.readFileSync('./data.txt',"utf-8")
console.log(fileData)

console.log('Second')

fs.readFile('./data.txt',"utf-8",(err,data) => {
    if(err) {
        console.log(err)
    } else {
        console.log(data)
    }
})

console.log('Third')

// fs.writeFileSync('greet.txt','Hello World')
fs.writeFile('greet.txt','Hello World ',{flag : 'a'},(err) => {
    if(err) {
        console.log('Error occured while writting')
    } else {
        console.log('File created successfully')
    }
})

fs.unlink('./data.txt',(err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('File Deleted Successfully')
    }
})

fs.app