import joi from "joi";

export function validateRentals(req, res, next) {
    const newRental = req.body;
  
    const rentalSchema = joi.object({
        customerId: joi.number().required(),
        gameId:joi.number().required() ,
        daysRented:joi.number().required(), 
    });
  
    const validation = rentalSchema.validate(newRental);
    if(validation.error) {
      res.status(422).send(validation.error.details);
      return;
    }
  
    next();
  }