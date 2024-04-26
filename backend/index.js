import express from "express";
import mysql from "mysql";


const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
})

app.get("/", (req,res) =>{
    res.json("Hello this is backend!")
})

app.get("/books", (req,res) =>{
    const q  = "select * from books";
    db.query(q, (err,data) =>{
        if(err){
            return res.json("NO books found : ");
        }
        return res.json(data);
    })
})

app.listen(8800, () =>{
    console.log("Connected to backend");
})