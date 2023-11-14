import React, { useEffect, useState } from "react";
import "./WeatherApp.css";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";
import { Link } from "react-router-dom";
import { TbWorldLatitude } from "react-icons/tb";
import { TbWorldLongitude } from "react-icons/tb";
import { WiSunrise } from "react-icons/wi";
import { TbSunset2 } from "react-icons/tb";
import { TiWavesOutline } from "react-icons/ti";
import { LiaMountainSolid } from "react-icons/lia";
import ReactDOM from "react-dom";

const WeatherApp = () => {
  let api_key = "50509bdeb121dd16b4b811c9940247a0";
  const [cityList, setCityList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [wicon, setWicon] = useState(cloud_icon);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [location, setCurrentLocation] = useState({
    humidity: "",
    Wind: "",
    temprature: "",
    location: "",
    locationSpecification: "",
    latitude: "",
    longitude: "",
    sealevel: "",
    groundlevel: "",
    sunrise: "",
    sunset: "",
  });

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    try {
      let response = await fetch(url);
      let data = await response.json();
      setCurrentLocation({
        humidity: data.main.humidity + "%",
        Wind: data.wind.speed + " km/h",
        temprature: Math.floor(data.main.temp) + " °C",
        location: data.name,
        locationSpecification: data.sys.country,
        latitude: data.coord.lat,
        longitude: data.coord.lon,
        sealevel: data.main.sea_level,
        groundlevel: data.main.grnd_level,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
      });
      setWeatherIcon(data.weather[0].icon);
    } catch (error) {
      alert("Enter a valid city name");
    }
  };

  const setWeatherIcon = (iconId) => {
    if (iconId === "0ld" || iconId === "01n") {
      setWicon(clear_icon);
    } else if (iconId === "02d" || iconId === "02n") {
      setWicon(cloud_icon);
    } else if (iconId === "03d" || iconId === "03n") {
      setWicon(drizzle_icon);
    } else if (iconId === "04d" || iconId === "04n") {
      setWicon(cloud_icon);
    } else if (iconId === "09d" || iconId === "09n") {
      setWicon(rain_icon);
    } else if (iconId === "10d" || iconId === "10n") {
      setWicon(rain_icon);
    } else if (iconId === "13d" || iconId === "13n") {
      setWicon(snow_icon);
    } else {
      setWicon(clear_icon);
    }
  };
  const fetchCityList = async () => {
    try {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries"
      );
      const data = await response.json();
      const allCities = data.data.map((country) => country.cities).flat();
      setCityList(allCities);
    } catch (error) {
      console.error("Error fetching city list:", error);
    }
  };
  useEffect(() => {
    fetchCityList();

    if (searchValue === "") {
      getCurrentLocation();
    }
  }, [searchValue]);

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setSearchValue(city);
    setShowDropdown(false);
    search(city);
  };

  const filteredCities = cityList.filter((city) =>
    city.toLowerCase().includes(searchValue.toLowerCase())
  );

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=Metric&appid=${api_key}`;
        let response = await fetch(url);
        let data = await response.json();
        setCurrentLocation({
          humidity: data.main.humidity + "%",
          Wind: data.wind.speed + " km/h",
          temprature: Math.floor(data.main.temp) + " °C",
          location: data.name,
          locationSpecification: data.sys.country,
          latitude: data.coord.lat,
          longitude: data.coord.lon,
          sealevel: data.main.sea_level,
          groundlevel: data.main.grnd_level,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
        });
        setWeatherIcon(data.weather[0].icon);
      });
    }
  };
  // useEffect(() => {

  // }, []);

  return (
    <div className="background">
      <Link className="link" to="/">
        Back
      </Link>
      <div className="container">
        <div className="top-bar">
          <input
            type="text"
            className="cityInput"
            placeholder="Search"
            maxLength={86}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setShowDropdown(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                search();
                setShowDropdown(false);
              }
            }}
          />
          <div className="search-icon" onClick={search}>
            <img src={search_icon} alt="img.png" />
          </div>
          <div>
            {showDropdown && searchValue && (
              <div className="dropdown">
                {filteredCities.slice(0, 5).map((city, index) => (
                  <div
                    key={index}
                    className="dropdown-item"
                    onClick={() => {
                      handleSelectCity(city);
                      // search(city);
                    }}
                  >
                    {city}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="Weather-image">
          <img src={wicon} alt="" />
        </div>
        <div className="Weather-temp"> {location.temprature} </div>
        <div className="Weather-location">
          {location.location}, {location.locationSpecification}
        </div>

        <div className=" Weather-location">{dateBuilder(new Date())}</div>
        <div className="Data-container">
          <div className="element">
            <img src={humidity_icon} alt="" className="icon" />
            <div className="data">
              <div className="humidity-percent">{location.humidity}</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} alt="" className="icon" />
            <div className="data">
              <div className="Wind-rate">{location.Wind}</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
        <div className="Data-container">
          <div className="element">
            <div>
              <TbWorldLatitude className="ricon" />
              <div className="data">
                <div className="lattitude">lat:{location.latitude}</div>
              </div>
            </div>
          </div>

          <div className="element">
            <div className="data">
              <TbWorldLongitude className="ricon" />{" "}
              <div className="longitude">lon:{location.longitude}</div>
            </div>
          </div>
        </div>

        <div className="Data-container">
          <div className="element">
            <TiWavesOutline className="ricon" />
            <div className="data">
              <div className="sealevel">seaLevel: {location.sealevel}</div>
            </div>
          </div>

          <div className="element">
            <LiaMountainSolid className="ricon" />
            <div className="data">
              <div className="groundlevel">
                groundlevel: {location.groundlevel}
              </div>
            </div>
          </div>
        </div>
        <div className="Data-container">
          <div className="element">
            <div className="data">
              <WiSunrise className="ricon" />

              <div className="sunrise">
                Sunrise:{" "}
                {new Date(location.sunrise * 1000).toLocaleTimeString()}
              </div>
            </div>
          </div>
          <div className="element">
            <div className="data">
              <TbSunset2 className="ricon" />

              <div className="sunset">
                Sunset: {new Date(location.sunset * 1000).toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
