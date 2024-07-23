import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import dbConnect from "./config/mongoose.config.js";
import extractValidationErrors from "./util/ErrorExtractor.js";

const app = express();
app.use(express.json(), cors());

//Catch all for routes without API call
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.statusCode = 404;
    err.name = "Not Found";
    next(err);
})

//Catch all for undefined API routes
app.use((err, req, res, next) => {
    console.log(err.statusCode);
    err.name === "ValidationError" ? err.statusCode = 400 : "";
    const normalizedError = {
        name: err.name || 'Server Error',
        statusCode: err.statusCode || 500,
        message: err.message || 'Something went wrong',
        validations: extractValidationErrors(err)
    };
    res.status(normalizedError.statusCode).json(normalizedError);
})

dotenv.config();
const PORT = process.env.PORT;

const DB_NAME = 'RoyalHandDB';
dbConnect(DB_NAME);

// Server and Socket startup
const server = app.listen(PORT, () => console.log(`Listening on PORT : ${PORT}`));
const io = new Server(server, {cors: true});

// Socket event listeners
io.on("connection", socket => {
    console.log(socket.id);
})