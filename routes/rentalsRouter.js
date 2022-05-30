import { Router } from "express";
import {getRentals,postRental,endRental,deleteRental} from "../controllers/rentalsController.js"

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", postRental);
rentalsRouter.post("/rentals/:id/return",endRental);
rentalsRouter.delete("/rentals/:id", deleteRental)

export default rentalsRouter;