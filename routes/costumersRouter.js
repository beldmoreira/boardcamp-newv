import { Router } from "express";
import {getCostumers,addCostumers,updateCostumer,getCustomerId} from "../controllers/costumersController.js"
import * as validation from "../middlewares/costumersValidator.js"

const costumersRouter = Router();

costumersRouter.get("/customers", getCostumers);
costumersRouter.get("/customers/:id",getCustomerId);
costumersRouter.post("/customers",validation.validateCostumers,addCostumers);
costumersRouter.put("/customers/:id",validation.validateCostumers,updateCostumer);

export default costumersRouter;