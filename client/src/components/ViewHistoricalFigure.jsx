import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./View.module.css";

const ViewHistoricalFigure = () => {
  const [historicalFigure, setHistoricalFigure] = useState({});
  const { id } = useParams();

// requests figure data by id 
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/historical-figures/${id}`)
      .then((res) => {
        console.log(res)
        setHistoricalFigure(res.data.figure)})
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      <nav className={styles.bar}>
        <h1>{historicalFigure.name}</h1>
      </nav>
      <div className={styles.container}>
        <div className={styles.left}>
          <img
            className={styles.image}
            src={historicalFigure.img}
            alt={historicalFigure.name}
          />
          <blockquote className={styles.quote}>
            "{historicalFigure.notableQuote}"
          </blockquote>
        </div>

        <div className={styles.right}>
          <div className={styles.card}>
            <h1>About</h1>
            <h4>Era: {historicalFigure.era}</h4>
            <h4>Achievements:</h4>
            <p>{historicalFigure.achievements}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewHistoricalFigure;
