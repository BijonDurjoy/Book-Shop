import express from "express";
import mysql from "mysql";
import cors from "cors";


const app = express();


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "project"
})

app.use(express.json());
app.use(cors())

app.get("/", (req,res) =>{
    res.json("Hello this is backend!")
})

app.get("/books", (req,res) =>{
    const q  = "select * from book";
    db.query(q, (err,data) =>{
        if(err){
            return res.json("NO books found :( ");
        }
        return res.json(data);
    })
})

app.post("/books", (req,res) =>{
    const q = "insert into book (title,des,cover,price) values (?)";
    const values  = [
        req.body.title,
        req.body.des,
        req.body.cover,
        req.body.price,
    ];

    db.query(q,[values], (err,data) =>{
        if(err){
            return res.json(err);
        }
        return res.json("Book has been created successfully!");
    })
})

app.delete("/books/:id", (req,res) =>{
    const bookId = req.params.id;
    const q = "delete from project where id = ?";

    db.query(q,[bookId], (err,data) =>{
        if(err){
            return res.json(err);
        }
        return res.json("Book has been deleted successfully.")
    })
})

app.listen(8800, () =>{
    console.log("Connected to backend");
})