import db from "../db.js";
import dayjs from "dayjs";

export async function getRentals(req,res){
    try {
        const {customerId, gameId}= req.query
        const rentDate = dayjs().format('YYYY-MM-DD');

        const result = await db.query(`SELECT * FROM rentals
        `,);
        res.status(200).send(result.rows);
      } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro ao obter os aluguéis!");
      }
}


export async function postRental(req, res) {
    const newCategory = req.body;
    try {
      const result = await db.query(`
        // INSERT INTO rentals (customerId,gameId,daysRented)
        VALUES ($1, $2, $3);
      `, []);
      
      res.sendStatus(201);
    } catch (e) {
      console.log(e);
      res.status(500).send("Ocorreu um erro registrar o aluguel!");
    }
  }
  export async function endRental(req,res){
    try {
        const result = await db.query("SELECT * FROM rentals");
        res.send(result.rows);
      } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro ao finalizar o aluguel!");
      }
}


export async function deleteRental(req, res) {
        try {
        const id = parseInt(req.params.id);
        const result = await db.query(`
        SELECT * FROM rentals WHERE id=$1;
        `,[id]);
        if(result.rows.length === 0 || result.rows[0].returnDate !== null){
          return res.status(400).send("Este aluguel não foi encontrado. Confira se ele já não foi finalizado");
        }
        await db.query(`
        DELETE FROM rentals WHERE id=$1;
        `, [id]);
        res.sendStatus(200);
        } catch (e) {
        console.log(e);
        res.status(500).send(" Ocorreu um erro ao deletar aluguel");
      }
} 