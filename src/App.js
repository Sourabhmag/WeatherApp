import './App.css';
import { useState, useEffect } from 'react';
import React from 'react';
import cloud from './images/cloud.png';
import far from './images/far.png';
import cel from './images/celsis.png';


function App() {
  const [city, setCity] = useState('Pune');
  const [data, setData] = useState({});
  const [currentTime, setCurrentTime] = useState();
  const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const getdata = async () => {
    var api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3869896b60d51401b389e3830552ef2f`
    const data = await fetch(api);
    const jsonData = await data.json();
    setData({
      cityName: city,
      country: jsonData.sys.country,
      windSpeed: jsonData.wind.speed,
      windDirection: jsonData.wind.deg,
      weather: jsonData.weather[0].main,
      weatherDescription: jsonData.weather[0].description,
      humidity: jsonData.main.humidity,
      tempF: jsonData.main.temp.toFixed(0) - 126,
      tempC: ((jsonData.main.temp - 32) * 5 / 9).toFixed(0) - 126,
      pressure: jsonData.main.pressure,
      minTemp: jsonData.main.temp_min.toFixed(0) -126,
      maxTemp: jsonData.main.temp_max.toFixed(0) -126,
      latitude: jsonData.coord.lat,
      longitude: jsonData.coord.lon
    });
  }

  const getTime = (date = new Date()) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    console.log(strTime);
    setCurrentTime(strTime);
  }


  useEffect(() => {
    getdata();
    getTime();
  }, [city])
  return (
    <div className="App">
      <div id="container">
        <input type="text" placeholder='city' onChange={event => setCity(event.target.value)} />
        <button className="button" onClick={getdata}>Get Data</button>


        <div className='allWeather'>
          <div className = 'tempAndIcon'>
            <p className='cityCountry'>{`${data.cityName},${data.country}`}</p>
            <p className='cloudDesc'>{data.weatherDescription}</p>
            <div className='temp'>
              <img src={cloud} height='70' alt='' />
              <div className='tempF'>
                <p className = 'tempSizeC'>{data.tempC}</p>
                <img className='celImg' src={cel} height='70' alt={`\u00b0 C`} />
              </div>
              <div className='tempF'>
                <p className='tempSizeF'>{data.tempF}</p>
                <img src={far} height='50' alt={`\u00b0 F`} />
              </div>

            </div>
          </div>
          <div>
            <p className = 'day'>{`${weekDay[new Date().getDay()]}, ${currentTime}`}</p>
          </div>
        </div>

        <div className = 'allOtherDataGrid'>
          <p className = 'otherData'>{`Latitude : ${data.latitude}`}</p>
          <p className = 'otherData'>{`Longitude : ${data.longitude}`}</p>
        
          <p className = 'otherData'>{`Wind Speed : ${data.windSpeed}`}</p>
          <p className = 'otherData'>{`Wind Direction : ${data.windDirection}`}</p>
       
          <p className = 'otherData'>{`Humidity : ${data.humidity}`}</p>
          <p className = 'otherData'>{`Pressure : ${data.pressure}`}</p>
        
          <p className = 'otherData'>{`Minimum Temp : ${data.minTemp}`}</p>
          <p className = 'otherData'>{`Maximum Temp : ${data.maxTemp}`}</p>
        </div>
      </div>
    </div>
  );
}

export default App;

