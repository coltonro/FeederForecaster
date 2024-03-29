import { useState } from 'react';
import RegionSelect from './regionSelect/RegionSelect';
import ActivityBar from './activityBar/ActivityBar';
import Recommendations from './recommendations/Recommendations';
import { Loader } from '@mantine/core';
import './App.css';

interface Forecast {
  activity: string,
  tempmax: number,
  cloudcover: string,
  windspeed: string,
  precipprob: number,
  description: string
}

type Details = {
  1: String,
  2: String,
  3: String
}

interface Foods {
  title: string,
  desc: string,
  imgPath: string,
  details: Details
}[]

function App() {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState(Array<Forecast>);
  const [foods, setFoods] = useState(Array<Foods>);
  const [showLoader, setShowLoader] = useState(false);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday"];
  const weekday: number = new Date().getDay();
  const weekdaysForActivityBars = [days[weekday], days[weekday + 1], days[weekday + 2], days[weekday + 3]];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const todaysMonth: string = months[new Date().getMonth()];
  const todaysDate: number = new Date().getDate();
  const twoDaysFromToday: number = new Date(`${todaysMonth} ${todaysDate + 2}`).getDate();
  const monthInTwoDays: string = months[new Date(`${todaysMonth} ${todaysDate + 2}`).getMonth()];

  const dailyPredictions = () => {
    const mappedForecast = forecast.map((day: Forecast, i: number) => {
      return <ActivityBar
        i={i}
        city={city}
        forecast={day}
        weekday={weekdaysForActivityBars[i]}
        key={`activityBar-${i}`} />
    });

    return showLoader ? <Loader className='forecastLoader' /> : mappedForecast;
  };

  return (
    <div className='app'>
      <header className='pageTitle'>
        <h1>Feeder Forecaster</h1><sup>Beta</sup>
      </header>
      <h2>How Busy will your Bird Feeders Be?</h2>
      <main className='allSections'>
        <section className='regionSelectContainer'>
          <div className='regionSelect'>
            <RegionSelect city={city} setCity={setCity} setForecast={setForecast} setFoods={setFoods} setShowLoader={setShowLoader}/>
          </div>
        </section>
        {/* <div className={city && forecast.length < 1 ? 'showLoader' : 'displayNone'}>
          <Loader size="xl" />
        </div> */}
        <div className={!city.length ? 'displayNone' : 'contentContainer'}>
          <section className='forecastContainer'>
            <div className='monthdate'>
              <h2>{city && city} Activity</h2>
              <p>{`${todaysMonth} ${todaysDate} - ${monthInTwoDays} ${twoDaysFromToday}`}</p>
            </div>
            <section className='activityBarContainer'>
              {city ? dailyPredictions() : <Loader />}
            </section>
            {/* <DetailedForecast forecast={forecast}/> */}
          </section>
          <section className='recommendationsSection'>
            <h2>Food</h2>
            <p>What Birds are Eating Now</p>
            <Recommendations city={city} foods={foods} />
          </section>
        </div>
      </main>
    </div>
  )
}

export default App