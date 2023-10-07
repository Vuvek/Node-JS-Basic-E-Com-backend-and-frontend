// experiment1 for synchronous

const crypto = require('node:crypto')

// const start = Date.now()
// crypto.pbkdf2Sync('password',"salt",100000,512,'sha512');
// crypto.pbkdf2Sync('password',"salt",100000,512,'sha512');
// crypto.pbkdf2Sync('password',"salt",100000,512,'sha512');
// crypto.pbkdf2Sync('password',"salt",100000,512,'sha512');
// crypto.pbkdf2Sync('password',"salt",100000,512,'sha512');
// console.log("Hash : ",Date.now() - start)

// console.log('hello I am here, How are you')



// Experiment-2 for Asynchronous 
// process.env.UV_THREADPOOL_SIZE = 5;
// const MAX_CALLS = 5;
// const start = Date.now()
// for (let i = 0; i < MAX_CALLS; i++) {
//     crypto.pbkdf2('password','salt',100000,512,'sha512',() => {
//         console.log(`Hash : ${i + 1}`,Date.now() - start)
//     })
// }

// console.log('hellolkjsadfkjlsajd')


// Not libuv's thread pool helps execute some of the async methods in Node.js but not all check

const https = require('node:https')

const MAX_CALLS = 12;
const start = Date.now()
for (let i = 0; i < MAX_CALLS; i++) {
    https.request("https://www.google.com",(res) => {
        res.on("data",() => {})
        res.on("end", () => {
            console.log(`Request : ${i + 1}`, Date.now() - start)
        })
    }).end()
}

console.log('hello')

