import db from "./../db.js";

export async function getCategories(req,res){
    try {
        const result = await db.query("SELECT * FROM categories");
        res.status(200).send(result.rows);
      } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro ao obter as categorias!");
      }
}


export async function addCategory(req, res) { 
    try {
      const {name} = req.body;

      if (!name){
        res.sendStatus(409);
      }
      const existsAlready = await db.query(`
        SELECT * FROM categories WHERE name =$1
      `, [name]
      )

      if (existsAlready.rows.length > 0){
        return res.status(409).send("Já existe uma categoria com este nome. Escolha outro!")
      }

      const result = await db.query(`
         INSERT INTO categories (name)
        VALUES ($1);
      `, [name]);
      
      res.sendStatus(201);
    } catch (e) {
      console.log(e);
      res.status(500).send("Ocorreu um erro registrar a categoria!");
    }
  }