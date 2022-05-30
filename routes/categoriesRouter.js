import { Router } from "express";
import { getCategories,addCategory } from "../controllers/categoriesController.js";
import  * as validation from "../middlewares/categoriesValidator.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories",getCategories);
categoriesRouter.post("/categories",validation.validateCategories,addCategory);

export default categoriesRouter;