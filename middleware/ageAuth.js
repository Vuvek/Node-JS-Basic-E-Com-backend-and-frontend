 function myMiddleware (req,res,next) {
    console.log('Middleware executed');
    if (!req.query.age) {
        res.send('Please Provide Age');
    } else if (req.query.age <= 18) {
        res.send('You can not Access This Site');
    } else {
        next();
    } 
    
};

module.exports = myMiddleware;