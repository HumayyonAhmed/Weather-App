import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import WeatherCard from './WeatherCard';

// var count=1;
function App() {
  const [weather, setWeather] = useState([]);
  const [current, setCurrent] = useState({});

  useEffect(() => {
    getLocation();
  }, []);

  function dtToDate(dt) {
    let unix_timestamp = dt;
    var date = new Date(unix_timestamp * 1000);
    return date;
  }
  function getLocation(){
    // if(count===1){
    var coords = {};
    navigator.geolocation.getCurrentPosition(function (position) {
      coords.long = position.coords.longitude;
      coords.lat = position.coords.latitude;
      var lat = coords.lat;
      var long = coords.long;

      axios.get("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=hourly,minutely&units=metric&appid=7d4a7868945b2e3d1b92cbe93ae2fd22")
        .then(function (response) {
          console.log(response.data);
          // count++;
          const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          const tempC = response.data.current.temp.toFixed(0);
          const tempF = ((tempC * 9 / 5) + 32).toFixed(0);
          const icon = response.data.current.weather[0].icon;
          const date = dtToDate(response.data.current.dt);
          const day = days[date.getDay()];
          const desc = response.data.current.weather[0].description;

          setCurrent({ "tempC": tempC, "tempF": tempF, "icon": icon, "date": date.toDateString(), "day": day, "desc": desc });

          response.data.daily.forEach(oneDay => {
            const tempC = oneDay.temp.max.toFixed(0);
            const tempF = ((tempC * 9 / 5) + 32).toFixed(0);
            const icon = oneDay.weather[0].icon;
            const date = dtToDate(oneDay.dt);
            const day = days[date.getDay()];
            const desc = oneDay.weather[0].description;

            setWeather(prevState => (
              [...prevState, { "tempC": tempC, "tempF": tempF, "icon": icon, "date": date, "day": day, "desc": desc }]
            ));
          });
        });
    });
    // }
  }

  const getTheme = (oneDay) => {
    if (oneDay.date.toLocaleDateString().toString() === new Date().toLocaleDateString().toString())
      return "active";
    return "";
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Forecast</h1>
      </header>
      <div className="current-weather">
        <span className="left">
          <h3>Current Weather</h3>
          <p>{current.date}</p>
          <p>{new Date().toLocaleTimeString()}</p>
          <p>{current.desc}</p>
        </span>
        <span className="right">
        <img src={
          require(current.icon === "50d" || current.icon === "50n" ? "./images/smoke.png" :
            current.icon === "11d" || current.icon === "11n" ? "./images/storm.png" :
              current.icon === "01d" || current.icon === "01n" ? "./images/sunny.png" :
                current.icon === "03d" || current.icon === "03n" ? "./images/cloud.png" :
                  current.icon === "04d" || current.icon === "04n" ? "./images/cloudy (1).png" :
                    current.icon === "10d" || current.icon === "10n" ? "./images/cloudy (2).png" :
                      current.icon === "02d" || current.icon === "02n" ? "./images/cloudy.png" :
                        current.icon === "09d" || current.icon === "09n" ? "./images/rainy.png" :
                          current.icon === "01d" || current.icon === "01n" ? "./images/rainy (1).png" : "./images/windy.png")
        } className="icon" alt={current.desc} />
        <span className="temp">{current.tempC}°</span>
        </span>
      </div>
      <div className="weather-cards">
        {
          weather.map((oneDay, index) => (
            <WeatherCard oneDay={oneDay} theme={`${getTheme(oneDay)}`} key={Math.floor(Math.random() * 1000)} />
          ))
        }
      </div>
    </div>
  );
}
export default App;