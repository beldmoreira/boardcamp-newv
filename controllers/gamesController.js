import db from "./../db.js";

export async function getGames(req,res){
  const {name} = req.query;
    try {
          if (!name) {
          const { rows: games } = await db.query(
            `
            SELECT games.*, categories.name as "categoryName" FROM games 
            JOIN categories ON games."categoryId"=categories.id
          `
          );
          return res.send(games);
        } else {
          const result = await db.query(`
          SELECT games.*,categories.name as "categoryName"FROM games 
          JOIN categories ON games."categoryId"=categories.id 
          WHERE LOWER(games.name) LIKE LOWER($1)
        `, [`${name}%`]);
        }
        res.send(result.rows);  
      } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro ao obter os jogos!");
      }
}

export async function addGame(req, res) {
    const {name,image,stockTotal,categoryId,pricePerDay} = req.body;
    if(parseInt(stockTotal) < 1|| parseInt(pricePerDay)< 1){
      return res.sendStatus(400)
    }
    try {
      const existsAlready = await db.query(`
        SELECT * FROM games WHERE name =$1
      `, [name]
      )

      if (existsAlready.rows.length > 0){
        return res.status(409).send("Já existe um jogo com este nome. Escolha outro!")
      }
      const result = await db.query(`
        // INSERT INTO games (name,image,stockTotal,categoryId, pricePerDay)
        VALUES ($1, $2, $3,$4,$5)
      `, [name,image,parseInt(stockTotal),categoryId,parseInt(pricePerDay)]);
      res.sendStatus(201);
    } catch (e) {
      console.log(e);
      res.status(500).send("Ocorreu um erro registrar o jogo!");
    }
  }

  