import joi from "joi";

export function validateGames(req, res, next) {
    const newGame = req.body;
  
    const gameSchema = joi.object({
      name: joi.string().required(),
      stockTotal: joi.string().required(),
      pricePerDay: joi.string().required()
    });
  
    const validation = gameSchema.validate(newGame);
    if(validation.error) {
      res.status(422).send(validation.error.details);
      return;
    }
  
    next();
  }
 