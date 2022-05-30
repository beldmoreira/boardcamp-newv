import db from "./../db.js";

export async function getCostumers(req,res){
    try {
      const cpf = req.query.cpf;
      if(!cpf){
        const result = await db.query(`
        SELECT * FROM customers
        `);
        res.send(result.rows);
      } else {
      const { rows: customers } = await db.query(`
      SELECT * FROM customers WHERE cpf LIKE $1
      `, [`${cpf}%`]);
      res.send(customers);
     }
      } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro ao obter os clientes!");
      }
}

export async function getCustomerId(req,res){
    try {
        const {id}=req.params
        const { rows: customer } = await db.query(`
      SELECT * FROM customers WHERE id=$1
      `,[id]);
      if(customer.length===0){
        return res.sendStatus(404);
      }
      res.send(customer[0]);
      } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro ao obter a/o clientes!");
      }
}
export async function addCostumers(req, res) {
    const {name,phone,cpf,birthday} = req.body;
    try {
      const result = await db.query(`
      SELECT id FROM customers WHERE cpf=$1
      `, [cpf]);
      if (result.rows.length > 0) {
        return res.status(409).send("Este cliente já foi cadastrado")
      }
      await db.query(`
      INSERT INTO customers (name, phone, cpf, birthday)
      VALUES ($1, $2, $3, $4) 
      `, [name,phone,cpf,birthday]);
      res.sendStatus(201);
    } catch (e) {
      console.log(e);
      res.status(500).send("Ocorreu um erro registrar a/o cliente!");
    }
  }
  
  export async function updateCostumer(req, res) {
    const {name,phone,cpf,birthday} = req.body;  
    try {
      const result = await db.query(`
        UPDATE costumers SET 
          name = $1,
          phone = $2,
          cpf = $3,
          birthday = $4,
        WHERE id=$5`, [name,phone,cpf,birthday,id]);
      res.sendStatus(200);
    } catch(e) {
      console.log(e);
      res.status(500).send("Ocorreu um erro ao atualizar a/o cliente!");
    }
  }



