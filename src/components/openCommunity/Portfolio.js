import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useParams } from "react-router-dom";
import { db } from "../../firebase-config";


const Portfolio = () => {
  

  let { id } = useParams();

  const [datos, setDatos] = useState(false);

  useEffect(() => {
    var citiesRef = db.collection("comunities").doc(id).get();

    citiesRef.then((doc) => {
      console.log(doc.data());
      setDatos(doc.data())
    })
   
    return () => {
        
    }
  }, [])

  const {createdAt, name, description} = datos;


    return (
      <>
        {  datos !== false &&
        <>
        <h2>{createdAt}</h2>
        <h2>{name}</h2>
        <h2>{description}</h2>
        </>
        }
        {  datos === false &&
        <>
        <h1>Cargando...</h1>
        </>
        }
      </>
    )
}

export default Portfolio;

