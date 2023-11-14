import React from "react";
import { Link } from "react-router-dom";
import "./home.css";


const MainPage = () => {
  return (
    <div className="mainPage">
        <div className="cal" >
            <img src="https://cdn-icons-png.flaticon.com/512/5885/5885046.png" alt="no img"></img>
        <Link to="/Calculator">Calculator</Link>
      </div>

      < div className="weather">
      <img  src="https://cdn-icons-png.flaticon.com/512/4234/4234787.png" alt="no img"></img>
        <Link to="/Weatherapp"> WeatherApp</Link>
      </div>
    </div>
  );
};

export default MainPage;