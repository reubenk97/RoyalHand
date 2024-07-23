import {model, Schema } from "mongoose";

const LobbySchema = new Schema(
    {
        players: {
            type: Number,
            required: [true, "Number of players are required."],
            min: [2, "Need at least 2 players."],
            max: [4, "Cannot have more than 4 players."]
        },
        gameMode: {
            type: String,
            required: [true, "Game mode required."],
            validate: {
                validator: v => ["VC", "Lucky"].includes(v),
                message: "Game mode must be VC or Lucky."
            }
        }
    },
    { timestamps: true }
);

const Lobby = model("Lobby", LobbySchema);
export default Lobby;