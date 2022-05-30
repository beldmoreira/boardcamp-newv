import joi from "joi";

export function validateCategories(req, res, next) {
    const newCategory = req.body;
  
    const categorySchema = joi.object({
      name: joi.string().required() 
    });
  
    const validation = categorySchema.validate(newCategory);
    if(validation.error) {
      res.status(422).send(validation.error.details);
      return;
    }
  
    next();
  }