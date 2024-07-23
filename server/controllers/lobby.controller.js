import Lobby from "../models/lobby.model.js";

const LobbyController = {
    create: async (req, res, next) => {
        try {
            const newLobby = await Lobby.create(req.body);
            res.json(newLobby);
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    },
    getOne: async (req, res, next) => {
        try {
            const oneLobby = await Lobby.findById(req.params.id);
            res.json(oneLobby);
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    },
    getAll: async (req, res, next) => {
        try {
            const allLobbys = await Lobby.find();
            res.json(allLobbys);
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    },
    updateOne: async (req, res, next) => {
        const options = {
            new: true, 
            runValidators: true 
        };
        try {
            const updatedLobby = await Lobby.findByIdAndUpdate(req.params.id, req.body, options);
            res.json(updatedLobby);
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    },
    deleteOne: async (req, res, next) => {
        try {
            const deletedLobby = await Lobby.findByIdAndDelete(req.params.id);
            res.json(deletedLobby);
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    }
}

export default LobbyController;