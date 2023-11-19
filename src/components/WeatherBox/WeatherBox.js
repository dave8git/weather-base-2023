import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';
import React, { useCallback, useState } from 'react';

const WeatherBox = props => {
  // const [name, setName] = useState();
  // const [temp, setTemp] = useState(); 
  // const [icon, setIcon] = useState(); 
  // const [description, setDescription] = useState(); 
  const [data, setData] = useState();
  const [pending, setPending] = useState(false); 
  const [error, setError] = useState(false)

  const handleCityChange = useCallback((cityName) => {
    setPending(true);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=c6987d79e2dd1eb2b4e3389157436e27&units=metric`)
      .then(res =>  {
      if(res.status === 200) { 
        return res.json()
      .then(data =>  {
        const weatherData = { 
          name: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main,
      }
      setError(false);
      setPending(false);
      setData(weatherData);
    }) } else {
        //alert('ERROR')
        setError(true);
    };
    });
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      {error && <ErrorBox>Ouch! There is no such city anywhere!</ErrorBox>}
      {pending && <Loader />}
      {(data && !pending) && <WeatherSummary {...data} /> }
      
    </section>
  )
};

export default WeatherBox;