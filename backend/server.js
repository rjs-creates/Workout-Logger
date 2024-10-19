import express from "express"
import dotenv from "dotenv"

//express app
const app = express()

//configuring environment variables
dotenv.config()

//Middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//Get route
app.get("/", (req, res) => {
    res.json({msg: "Get routes"});
})

//listening for requests on Port
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})