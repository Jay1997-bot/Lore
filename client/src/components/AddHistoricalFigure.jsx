import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Add.module.css";

const AddHistoricalFigure = (props) => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [era, setEra] = useState("");
  const [lifeSpan, setLifeSpan] = useState({
    birthYear: '',
    birthEra: 'AD',
    deathYear: '',
    deathEra: 'AD'
  })
  const [achievements, setAchievements] = useState("");
  const [notableQuote, setNotableQuote] = useState("");

  const handleLifeSpanChange = (field, value) => {
    setLifeSpan((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/historical-figures", {
        name,
        img,
        era,
        lifeSpan,
        achievements,
        notableQuote,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        const errorResponse = err.response.data.errors;
        const errorArr = [];
        for (const key of Object.keys(errorResponse)) {
          errorArr.push(errorResponse[key].message);
        }
        setErrors(errorArr);
      });
  };

  return (
    <>
      <nav className={styles.nav}>
        <h1>Add Historical Figure</h1>
        <button>
          <Link to="/historical-figures">Back to Timeline</Link>
        </button>
      </nav>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          {errors.map((err, index) => (
            <p style={{ color: "red" }} key={index}>
              {err}
            </p>
          ))}
          <div className={styles.formSection}>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />

            <label>Image URL:</label>
            <input
              type="text"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
            <br />

            <label>Era:</label>
            <input
              type="text"
              value={era}
              onChange={(e) => setEra(e.target.value)}
            />
            <br />

            <label>Birth Year:</label>
            <div className={styles.formSection__lifeSpan}>
              <input
                type="text"
                value={lifeSpan.birthYear}
                onChange={(e) => handleLifeSpanChange('birthYear', e.target.value)}
              />
              <select
                value={lifeSpan.birthEra}
                onChange={(e) =>handleLifeSpanChange('birthEra', e.target.value)}
              >
                <option value='AD'>AD</option>
                <option value='BC'>BC</option>
              </select>
            </div>
          
            <label>Death Year:</label>
            <div className={styles.formSection__lifeSpan}>
              <input
                type="text"
                value={lifeSpan.deathYear}
                onChange={(e) => handleLifeSpanChange('deathYear', e.target.value)}
              />
              <select
                value={lifeSpan.deathEra}
                onChange={(e) =>handleLifeSpanChange('deathEra', e.target.value)}
              >
                <option value='AD'>AD</option>
                <option value='BC'>BC</option>
              </select>
            </div>
            <br />

              <label>Achievements:</label>
              <textarea
                value={achievements}
                onChange={(e) => setAchievements(e.target.value)}
              />

            <label>Notable Quote:</label>
            <input
              type="text"
              value={notableQuote}
              onChange={(e) => setNotableQuote(e.target.value)}
            />
            <br />

            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddHistoricalFigure;

