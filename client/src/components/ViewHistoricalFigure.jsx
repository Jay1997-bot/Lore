import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./ViewHistoricalFigure.module.css";
import Navbar from "./Navbar";

const ViewHistoricalFigure = () => {
  const [historicalFigure, setHistoricalFigure] = useState({});
  const { id } = useParams();

  // Requests figure data by id
  useEffect(() => {
    axios
      .get(`https://lore-4.onrender.com/api/historical-figures/${id}`)
      .then((res) => {
        console.log(res);
        setHistoricalFigure(res.data.figure);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className={styles.page}>
      <Navbar></Navbar>
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
            <h4>Life Span:</h4>
            <p>{historicalFigure.lifeSpan ? `${historicalFigure.lifeSpan.birthYear} ${historicalFigure.lifeSpan.birthEra} - ${historicalFigure.lifeSpan.deathYear} ${historicalFigure.lifeSpan.deathEra}` : "Information not available"}</p>
            <h4>Achievements:</h4>
            <p>{historicalFigure.achievements}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewHistoricalFigure;
