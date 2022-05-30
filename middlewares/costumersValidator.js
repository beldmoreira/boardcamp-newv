import joi from "joi";

export function validateCostumers(req, res, next) {
    const newCostumer = req.body;
  
    const costumerSchema = joi.object({
      name: joi.string().required(),
      phone:joi
      .string()
      .pattern(/^[0-9]{10,11}$/)
      .required(),
      cpf:joi
      .string()
      .pattern(/^[0-9]{11}$/)
      .required(),
      birthday:joi
      .string()
      .pattern(/^\d{4}\-\d{2}\-\d{2}$/)
      .required(),
    });
  
    const validation = costumerSchema.validate(newCostumer);
    if(validation.error) {
      res.status(422).send(validation.error.details);
      return;
    }
  
    next();
  }
 