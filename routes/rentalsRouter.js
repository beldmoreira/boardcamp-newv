import { Router } from "express";
import {getRentals,postRental,endRental,deleteRental} from "../controllers/rentalsController.js";
import  * as validation from "../middlewares/rentalsValidator.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", validation.validateRentals,postRental);
rentalsRouter.post("/rentals/:id/return",validation.validateRentals,endRental);
rentalsRouter.delete("/rentals/:id",validation.validateRentals,deleteRental)

export default rentalsRouter;