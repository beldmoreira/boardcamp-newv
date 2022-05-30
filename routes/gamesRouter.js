import { Router } from "express";
import {getGames,addGame} from "../controllers/gamesController.js"
import * as validation from "../middlewares/gamesValidator.js"

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games",validation.validateGames,addGame);

export default gamesRouter;

  