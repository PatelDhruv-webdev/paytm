const express = require("express");
const rootRouter = require('./routes/index');

const app = express();



app.use('/api/v1', rootRouter);


const PORT =3000 
module.exports = {PORT}


app.listen(PORT,() =>{
    console.log("server is running")
    
})

