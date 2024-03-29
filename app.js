require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conn");
const router = require("./Routes/router");

const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/test",(req,res)=>{
    res.json("server start")
})

app.use(router);

app.get("/", (req, res) =>
  res.send(
    `<h1>Site is Working. click <a href=${process.env.BASE_URL}>here</a> to visit frontend.</h1>`
  )
);


app.listen(port, () => {
    console.log(`server is start port number ${port}`);
});