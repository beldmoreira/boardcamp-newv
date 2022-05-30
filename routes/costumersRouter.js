import { Router } from "express";
import {getCostumers,addCostumers,updateCostumer,getCustomerId} from "../controllers/costumersController.js"

const costumersRouter = Router();

costumersRouter.get("/customers", getCostumers);
costumersRouter.get("/customers/:id",getCustomerId);
costumersRouter.post("/customers",addCostumers);
costumersRouter.put("/customers/:id",updateCostumer);

export default costumersRouter;