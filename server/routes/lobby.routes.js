import { Router } from "express";
import LobbyController from "../controllers/lobby.controller.js";

const lobbyRouter = Router();

lobbyRouter.route('/create')
    .post(LobbyController.create)

lobbyRouter.route('/lobbies/:id')
    .get(LobbyController.getOne)
    .put(LobbyController.updateOne)
    .delete(LobbyController.deleteOne)

lobbyRouter.route('/lobbies/:id/play')
    .get(LobbyController.getOne)

export default lobbyRouter;