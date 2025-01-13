import React, { useEffect, useState } from 'react';
import { Chrono } from 'react-chrono';
import axios from 'axios';
import styles from './Timeline.module.css'
import Navbar from './Navbar';

const HistoricalFiguresTimeline = () => {
  const [figures, setFigures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get('https://lore-4.onrender.com/api/historical-figures')
      .then((response) => {
        if (response.data && response.data.figures) {
          console.log(response.data.figures)

          const sortedFigures = response.data.figures.sort((a, b) => {
            const aYear = a.lifeSpan.birthYear;
            const bYear = b.lifeSpan.birthYear;
            return bYear - aYear;
          });

          // Map the data to the format required by react-chrono
          const timelineItems = sortedFigures.map((figure) => ({
            title: `${figure.lifeSpan.birthYear} ${figure.lifeSpan.birthEra} - ${figure.lifeSpan.deathYear} ${figure.lifeSpan.deathEra}`,
            cardTitle: figure.name,
            cardSubtitle: figure.era,
            cardDetailedText: figure.achievements,
            media: {
              type: "IMAGE",
              source: {
                url: figure.img
              }
            }
           
          }));
          
          setFigures(timelineItems);
        }
      })
      .catch((err) => {
        setError('Failed to load historical figures.');
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.page}>
      <Navbar></Navbar>
      <div className={styles.timelineContainer}>
        <Chrono
          cardHeight={500}
          contentDetailsHeight={1}
          items={figures}
          mode="VERTICAL_ALTERNATING"
          textOverlay 
          theme={{
            primary: "#1f78b4",
            secondary: "white",
            cardBgColor: "#ffffff",
            cardForeColor: "#000000",
          }}
          useReadMore={false}
        />
      </div>
    </div>
  );
};

export default HistoricalFiguresTimeline;
