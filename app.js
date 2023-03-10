require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conn");
const router = require("./Routes/router");

const port = process.env.PORT || 6002;


app.use(cors());
app.use(express.json());

app.use(router)

app.listen(port,()=>{
    console.log(`server start on port ${port}`);
})