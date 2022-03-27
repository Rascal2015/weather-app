import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("london");
  const [weather, setWeather] = useState({});
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query.replace(
        /\s/g,
        ""
      )}&appid=7deb1280b3c4730099f151dcc3f06662&units=metric`
    )
      .then((res) => res.json())
      .then((post) => {
        setWeather(post);
      });
  }, []);
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query.replace(
          /\s/g,
          ""
        )}&appid=7deb1280b3c4730099f151dcc3f06662&units=metric`
      )
        .then((res) => res.json())
        .then((post) => {
          setWeather(post);
        });
        setQuery('')
    }
  };
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

    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleSearch}
          />{" "}
        </div>{" "}
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {" "}
                {weather.name}, {weather.sys.country}{" "}
              </div>{" "}
              <div className="date"> {dateBuilder(new Date())} </div>{" "}
            </div>{" "}
            <div className="weather-box">
              <div className="temp"> {Math.round(weather.main.temp)}° c </div>{" "}
              <div className="weather"> {weather.weather[0].main} </div>
            </div>{" "}
          </div>
        ) : (
          ""
        )}{" "}
      </main>{" "}
    </div>
  );
}

export default App;
