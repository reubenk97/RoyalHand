import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import dbConnect from "./config/mongoose.config.js";
import extractValidationErrors from "./util/ErrorExtractor.js";
import lobbyRouter from "./routes/lobby.routes.js";

const app = express();
app.use(express.json(), cors());
app.use('/api', lobbyRouter);

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

//SOCKET LOGIC
const players = [];
let playerOneHand = [];
let playerTwoHand = [];
let currTurn = {};
const playedCards = [];
let playPileCard = {};

// Socket event listeners
io.on("connection", socket => {
    console.log("client connected with id: " + socket.id);
    console.log(players);

    socket.on("new player", (playerInfo) => {
        console.log('adding new player info');
        players.push({
            ...playerInfo,
            sid: socket.id
        });
        console.log(players);
        io.emit("players", players);
    });

    socket.on("start", () => {
        io.emit("start game");
        currTurn = players[0];
        fetch ("https://www.deckofcardsapi.com/api/deck/new/draw/?count=26")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                for(let i = 0; i < data.cards.length - 1; i+=2) {
                    playerOneHand.push(data.cards[i])
                    playerTwoHand.push(data.cards[i+1]);
                }
                io.emit("player hands", playerOneHand, playerTwoHand);
            })
            .catch(err => console.log(err))
    });

    socket.on("player list", () => {
        io.emit("players", players);
    });

    socket.on("player hand 1 update", (hand) => {
        playerOneHand = [...hand];
        io.emit("current 1 hand", playerOneHand);
    })

    socket.on("player hand 2 update", (hand) => {
        playerTwoHand = [...hand];
        io.emit("current 2 hand", playerTwoHand);
    })

    socket.on("player move", (card) => {
        playedCards.push(card);
        playPileCard = card;
        if (currTurn == players[0])
            currTurn = players[1];
        else
            currTurn = players[0];
        io.emit("current pile and turn", playPileCard, currTurn);
    })

    socket.on("disconnect", () => {
        console.log(socket.id + " has disconnected");
        players.splice(players.findIndex(player => player.sid == socket.id), 1);
        io.emit("players", players);
    });
});