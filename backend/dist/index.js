import app from "./app.js";
import connectToDatabase from "./db/connection.js";
/*import express from "express";

import { config } from "dotenv"; // import config from .env file
config(); // connect mongodb

const app = express();

// accept route

// 4 types of different requests:
//GET -
//PUT -
//POST -
//DELETE -

// middlewares
app.use(express.json()); //would use the incoming data in json form*/
/*
app.post("/user/:userid", (req, res, next) => {
  console.log(req.params.userid);
  return res.send("Hello");
}); //middleware; use postman to inspect
*/
// connection and listeners
const PORT = process.env.PORT;
connectToDatabase().then(() => {
    app.listen(PORT, () => console.log("Server Open & Connected to Database")); //set up the port
}).catch((err) => { console.log(err); });
//# sourceMappingURL=index.js.map