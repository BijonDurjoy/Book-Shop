import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Books = () => {
  const [books,setBooks] = useState([]);
  //fach data from mysql server
  useEffect(() =>{
    const fecthAllBooks = async () =>{
      try{
        const res = await axios.get("http://localhost:8800/books")
        setBooks(res.data);
        console.log(res);
      }catch(err){
        console.log(err);
      }
    }
    fecthAllBooks()
  },[])

  return (
    <div>
      <h1>Rolomari Book Shop</h1>
      <div className="books">
        {books.map(book=>(
          <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} alt=""/>}
            <h2>{book.title}</h2>
            <p>{book.des}</p>
            <span>{book.price}</span>
          </div>
        ))}
      </div>
      <Link to="/add">Add Button</Link>
    </div>
  );
};

export default Books