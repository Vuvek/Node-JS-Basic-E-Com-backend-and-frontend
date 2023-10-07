// Video 12 Code

// const fs = require('fs');

// let arg = process.argv;
// console.log(arg)

// const removed = arg.splice(0,4);
// console.log(removed,'removedflksajdlkf',arg);

// if (removed[2]?.toLowerCase() == 'add' && removed[3] ) {
//     const data = arg.join(' ');
//     fs.writeFileSync(`${removed[3]}.txt`,data)
// } else if (removed[2]?.toLowerCase() == 'remove' && removed[3]) {
//     console.log('helllooosjfskaljd')
//     fs.unlinkSync(`${removed[3]}.txt`);
// } else if (removed[2] == 'read' && removed[3]) {
//     const readData = fs.readFileSync(`${removed[3]}.txt`)
//     console.log(readData.toString())
// } else {
//     console.log('Invalid Input ')
// }



// Video 13 Code 


// const fs = require('fs');
// const path = require('path');
// let pathofDesktop = __dirname.split(`\\`)
// pathofDesktop.pop()
// console.log(pathofDesktop)
// const folderPath = path.join(pathofDesktop.join('\\'),'Files')
// console.log(folderPath)





// fs.mkdir(folderPath,(err) => {
//     if (err) {
//         console.log('file is not created successfully')
//     } else {
//         console.log('File is created Succesfully')
//     }
// })

// for (let ind = 0; ind < 5; ind++) {
//     fs.writeFileSync(folderPath+`/file-${ind}.txt`,`Data-${ind}`)
// }


// fs.readdir(folderPath,(err,files) => {
//     files.forEach(item => {
//         console.log(item)
//     })
// })

// fs.rename(folderPath+`/file-0.txt`,folderPath+`/file-20.txt`,(err) => {
//     if (err) {
//         console.log('File is not renamed successfully')
//     } else {
//         console.log("File is renamed successfully")
//     }
// })

// fs.appendFile(folderPath+`/file-0.txt`,'This is some appended data that we are adding in this file so that we can learn about this that how to append to data',(err) => {
//     if (err) {
//         console.log("No Data is appended")
//     } else {
//         console.log('Data is Appended Successfully')
//     }
// })


let a = 2;
let b = 3;

function waitingData() {
    let promise = new Promise((resolve,reject) => {
        try {
            setTimeout(() => {
                b = 20;
                resolve(b)
            },3000)
        } catch (error) {
            reject('Something Is Going Wrong')
        }
    })
    return promise;

}

const result = waitingData()
result.then((res) => console.log(a+b)).catch((err) => console.log(err))
console.log(a+b,'a+b');

