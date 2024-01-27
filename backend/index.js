const express = require("express");
const cors=require("cors");
let PORT=3000;

let app=express();
app.use(cors());
app.use(express.json());

const mainrouter = require("./routes/index");


app.use("api/vi/",mainrouter);
app.listen(PORT);