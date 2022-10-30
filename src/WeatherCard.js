import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

export default function WeatherCard({oneDay, theme}) {
    return (
      <div className={`Weather-Card ${theme}`} title={oneDay.desc}>
      <span className="day">{oneDay.day}</span>
      <div className="weather-icon">
        <img src={
          require(oneDay.icon==="50d"||oneDay.icon==="50n" ? "./images/smoke.png" : 
          oneDay.icon==="11d"||oneDay.icon==="11n" ? "./images/storm.png" : 
          oneDay.icon==="01d"||oneDay.icon==="01n" ? "./images/sunny.png" : 
          oneDay.icon==="03d"||oneDay.icon==="03n" ? "./images/cloud.png" :
          oneDay.icon==="04d"||oneDay.icon==="04n" ? "./images/cloudy (1).png" : 
          oneDay.icon==="10d"||oneDay.icon==="10n" ? "./images/cloudy (2).png" :
          oneDay.icon==="02d"||oneDay.icon==="02n" ? "./images/cloudy.png" : 
          oneDay.icon==="09d"||oneDay.icon==="09n" ? "./images/rainy.png" : 
          oneDay.icon==="01d"||oneDay.icon==="01n" ? "./images/rainy (1).png" : "./images/windy.png")
          } alt={oneDay.icon}/>
      </div>
      <span className="temperature">
        <span className="celcius">{oneDay.tempC}°</span>
        <span className="fahrenheit">{oneDay.tempF}°</span>
      </span>
    </div>
    )
  }
WeatherCard.propTypes = {
  oneDay: PropTypes.object.isRequired,
};