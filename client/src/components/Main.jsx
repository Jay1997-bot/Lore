import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import Navbar from "./Navbar";
import styles from "./Main.module.css";

const Main = (props) => {


  const [figures, setFigures] = useState([]);

  //requests all figures from db and sets figures array
  useEffect(() => {
    axios
      .get("https://lore-4.onrender.com/api/historical-figures")
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
      const eraOrder = { BC: -1, AD: 1 }
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
      .delete("https://lore-4.onrender.com/api/historical-figures/" + id)
      .then((res) => {
        setFigures(figures.filter((figure) => figure._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.page}>
      <Navbar></Navbar>
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
                  Birth: {figure.lifeSpan.birthYear || "Unknown"} {figure.lifeSpan.birthEra}
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
      <div className={styles.about}>
        <h1>About</h1>

        <p>Welcome to [Website Name subject to change], a collaborative world-building project where imagination reigns supreme! </p>

        <p>We invite you to step into a rich and ever-evolving fantasy universe where your contributions shape the very fabric of reality. Dive deep into existing lore, explore established kingdoms, and encounter fascinating creatures. But this is no passive experience. </p>

        <p>[Website Name subject to change] empowers you to become a true architect of this fantastical realm. Craft compelling narratives, introduce captivating characters, and design unique locations. Your stories will not only entertain but also actively influence the course of history within this shared universe. </p>

        <p>As you contribute, you'll earn points that reflect the impact of your creations. These points unlock exciting possibilities: from minor adjustments to the established lore to truly monumental events that reshape the world. Imagine introducing a devastating plague, sparking a revolution, or even bringing a new deity to life! </p>

        <p>[Website Name subject to change] is more than just a website; it's a vibrant community of creators united by a shared passion for fantasy. Connect with fellow world-builders, exchange ideas, and provide feedback on each other's work. Together, we will weave a tapestry of stories that will captivate and inspire for generations to come.</p>

        <h2>Join us on this epic adventure and let your imagination soar!</h2>

        <h3>Future Plans:</h3>
        <ul>
          <li><strong>Enhanced User Experience:</strong> We are committed to continually improving your experience on [Website Name subject to change]. This includes refining the user interface, expanding search and filtering options, and implementing more robust tools for creators.</li>
          <li><strong>Expanded Community Features:</strong> We plan to introduce new features to foster deeper community engagement. This may include forums, chat rooms, collaborative writing tools, and even in-game events.</li>
          <li><strong>Advanced Lore Management:</strong> We are developing sophisticated systems to track and manage the ever-growing body of lore. This will ensure clarity, consistency, and a seamless experience for all users.</li>
          <li><strong>Gamification and Rewards:</strong> We will continue to refine the point system, introducing new rewards and incentives for active participation. This may include exclusive content, access to premium features, and opportunities to collaborate with experienced world-builders.</li>
          <li><strong>Mobile Accessibility:</strong> We are working towards making [Website Name subject to change] fully accessible on mobile devices, allowing you to contribute and engage with the community from anywhere.</li>
        </ul>

        <p>We are excited about the future of [Website Name subject to change] and the incredible stories that will be born from this collaborative endeavor. Thank you for joining us on this journey!</p>

      </div>
    </div>
  );
};

export default Main;

