import '../styles/Weather.css';
import { useEffect, useState } from 'react';

function Weather() {

  const unit = 'imperial';

  const [data, setData] = useState(null);
  const [cityName, setCityName] = useState('');// This might come from geolocation
  const [choices, setChoices] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    const cityName = e.target.city.value;
    const stateCode = e.target.state.value;
    const countryCode = e.target.country.value;
    // Get coords from api
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&appid=3c7d6427cc530acb8f1150c4ef40467d&units=${unit}&limit=5`)
      .then(initRes => initRes.json().then(res => {
        if (res.length > 0) {
          setChoices(res);
        };
      }));
  };

  const makeChoice = (choice) => {
    // Get weather data
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${choice.lat}&lon=${choice.lon}&appid=3c7d6427cc530acb8f1150c4ef40467d&units=${unit}`)
      .then(initRes => initRes.json().then(res => {
        setData(res);
        setCityName(choice.name);
      }));
  };

  const displayCurrentData = () => {
    return (
      <div className='weather-tile'>
        {console.log('data', data)}
        <h2 className='title'>Weather in {cityName}</h2>
        <div className='current'>
          <h2 className='title'>{Math.ceil(data.current.temp)}</h2>
          <div className='description'>
            <div className='temps'>
              L: {Math.ceil(data.daily[0].temp.min)}
              H: {Math.ceil(data.daily[0].temp.max)}
            </div>
            <p>{data.current.weather[0].main}</p>
          </div>
        </div>
        <div className='hourly'>
          {
            data.hourly.map((hour, index) => {
              if (index < 8) {
                return(
                  <div className='hour'>
                    <img src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} alt={hour.weather[0].main}/>
                    <p>{Math.ceil(hour.temp)}</p>
                    <p>{new Date(hour.dt * 1000).getHours().toString()+':00'}</p>
                  </div>
                )  
              }
            })
          }
        </div>
        <div className='daily'>
          {
            data.daily.map((day, index) => {
              const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
              if (index < 6 && index !== 0) {
                return (
                  <div className='day'>
                    <div className='description'>
                      <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt={day.weather[0].main}/>
                      <div>
                        <p className='day-of-week'>{dayOfWeek[new Date(day.dt * 1000).getDay()]}</p>
                        <p>{day.weather[0].main}</p>
                      </div>
                    </div>
                    <div className='temps'>
                      <p className='max-temp'>{Math.ceil(day.temp.max)}</p>
                      <p className='min-temp'>{Math.ceil(day.temp.min)}</p>
                    </div>
                    
                  </div>
                )
              }
            })
          }
        </div>
      </div>
    )
  };

  
  useEffect(() => {
    // Might use geotracker to get current location
  }, []);

  

  return (
    <div className="weather">
      <div className='left-column'>
        <h1 className='title'>Weather</h1>
        <form onSubmit={handleSubmit}>
          <input className='city-search' name='city' placeholder='Search for city...' />
          <input className='city-search' name='state' placeholder='Search for state...' />
          <input className='city-search' name='country' placeholder='Search for country...' />
          <button>Submit</button>
        </form>
        Choices
        {
          choices &&
          choices.map(choice => (
            <button onClick={() => makeChoice(choice)}>
              {choice.name}, 
              {choice.state}, 
              {choice.country}
            </button>
          ))
        }
      </div>
      <div className='main'>
        {data && displayCurrentData() /* There has to be a better way*/}
      </div>
    </div>
  );
};

export default Weather;