import express from "express";
import mysql from "mysql";


const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
})

app.use(express.json());
app.get("/", (req,res) =>{
    res.json("Hello this is backend!")
})

app.get("/books", (req,res) =>{
    const q  = "select * from books";
    db.query(q, (err,data) =>{
        if(err){
            return res.json("NO books found :( ");
        }
        return res.json(data);
    })
})

app.post("/books", (req,res) =>{
    const q = "insert into books (title,des,cover) values (?)";
    const values  = [
        req.body.title,
        req.body.des,
        req.body.cover,
    ];

    db.query(q,[values], (err,data) =>{
        if(err){
            return res.json(err);
        }
        return res.json("book has been created successfully!");
    })
})

app.listen(8800, () =>{
    console.log("Connected to backend");
})