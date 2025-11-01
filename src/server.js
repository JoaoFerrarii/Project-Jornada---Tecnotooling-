require('dotenv').config();
const express  =require("express");
const routes = require('./routes');
require('./database');

const app =express();

app.use(express.json());
app.use(routes);

const { PORT } =process.env;
app.listen(PORT,()=>{
    console.log(`teste ${PORT}`);
});