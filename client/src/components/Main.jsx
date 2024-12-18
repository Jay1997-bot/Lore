import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Main.module.css";

const Main = (props) => {

  
  const [figures, setFigures] = useState([]);

//requests all figures from db and sets figures array
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/historical-figures")
      .then((res) => {
        console.log(res.data.figures)
        const sortedFigures = sortFigures([...figures, ...res.data.figures])
        setFigures(sortedFigures)
        console.log('sortedFigures', sortedFigures)
        // setFigures(sortedFigures);
        console.log(figures)
      })
      .catch((err) => console.log(err));
  }, []);


//sort figures by birth

const sortFigures = (figures) => {
  return figures.sort((a, b) => {
    const eraOrder = {BC: -1, AD : 1}
    const eraA = eraOrder[a.lifeSpan?.era] || 0;
    const eraB = eraOrder[b.lifeSpan?.era] || 0;
    if (eraA !== eraB) {
      return eraA - eraB; // Sort by era first
    }

    const birthYearA = a.lifeSpan?.birthYear || Infinity;
    const birthYearB = b.lifeSpan?.birthYear || Infinity;
    return birthYearA - birthYearB;

  })
}

//Deletes specific user based on id
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8000/api/historical-figures/" + id)
      .then((res) => {
        setFigures(figures.filter((figure) => figure._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <h1>Historical Figures</h1>
        <button style={{ backgroundColor: "goldenrod" }}>
          <Link to={"/figures/new"}>Add Historical Figure</Link>
        </button>
      </nav>
      {/* Main display of all the figures  */}
      <div className={styles.container}>
        {figures.map((figure) => {
          return (
            <div className={styles.figureBox} key={figure._id}>
              <div className={styles.imgWrapper}>
                <img
                  className={styles.img}
                  src={figure.img}
                  alt="A historical figure"
                />
              </div>

              <div className={styles.info}>
                <p className={styles.name}>{figure.name}</p>
                <p className={styles.era}>
                  Birth: {figure.lifeSpan.birthYear || "Unknown"} { figure.lifeSpan.birthEra}
                </p>
                <p className={styles.contribution}>
                  Contribution: {figure.achievements || "N/A"}
                </p>
                <div className={styles.buttons}>
                  <button className={styles.viewButton}>
                    <Link to={"/historical-figures/" + figure._id}>View Profile</Link>
                  </button>

                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(figure._id)}
                  >
                    Remove from History
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Main;

