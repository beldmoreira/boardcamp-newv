import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";
import categoriesRouter from "./routes/categoriesRouter.js";
import costumersRouter from "./routes/costumersRouter.js";
import gamesRouter from "./routes/gamesRouter.js";
import rentalsRouter from "./routes/rentalsRouter.js";

const app = express();
app.use(cors());
app.use(json());
dotenv.config();

app.use(categoriesRouter);
app.use(costumersRouter);
app.use(gamesRouter);
app.use(rentalsRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Servidor em pé na porta ${port}`));