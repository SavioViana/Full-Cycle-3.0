const express = require("express")
const mysql = require("mysql2/promise")

const app = new express()
const port = 3000

const config = {
    host: 'mysql-db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const insertRecord = async () => {
    const connection = await  mysql.createConnection(config)
    const sql = `INSERT INTO people(name) values('Savio Viana')`
    connection.query(sql)
    connection.end()
}

const getRecords = async () => {
    const connection = await mysql.createConnection(config)
    const sql = `SELECT name FROM people`
    const [rows] = await connection.query(sql)
    connection.end()

    return rows;
}


app.get('/', async (req, res) => {

    await insertRecord()
    
    const rows = await getRecords()    

    let html = '<h1>Full Cycle Rocks!</h1>'
    
    let li = ''
    
    rows.forEach(element => {
        li += `<li>${element['name']}</li>`
    });

    const ul = `<ul>${li}</ul>`
    
    html = html + ul;

    res.send(html)
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})