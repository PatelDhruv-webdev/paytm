const express = require('express')
const userRouter = require('./user')
const cors = require("cors");






const route = express.Router();

app.use(cors())
app.use(bodyparser.json());

app.use('/api/v1/user', userRouter);






module.exports = route; 

