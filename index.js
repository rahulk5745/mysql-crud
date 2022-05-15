const express = require('express')

const userRouter = require('./routes/index')

var AppError = require("./utils/appError");
var errorHandler = require("./utils/errorHandler");

const app = express()
const port = process.env.PORT || 4000


app.use(express.json())
app.use(userRouter)

app.all("*", (req, res, next) => {
    next(new AppError(`The URL ${req.originalUrl} does not exists`, 404));
   });
   app.use(errorHandler);
   
   

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
