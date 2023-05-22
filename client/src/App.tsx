import { useState } from 'react';
import RegionSelect from './regionSelect/RegionSelect';
import ActivityBar from './activityBar/ActivityBar';
import Recommendations from './recommendations/Recommendations';
import Species from './species/Species';
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

interface Foods {
  title: string,
  desc: string,
  imgPath: string,
  details: string
}[]

function App() {
  const [city, setCity] = useState('')
  const [forecast, setForecast] = useState(Array<Forecast>)
  const [foods, setFoods] = useState(Array<Foods>)

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday"]
  const weekday: number = new Date().getDay()
  const weekdaysForActivityBars = [days[weekday], days[weekday + 1], days[weekday + 2], days[weekday + 3]]
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const todaysMonth: string = months[new Date().getMonth()]
  const todaysDate: number = new Date().getDate()
  const twoDaysFromToday: number = new Date(`${todaysMonth} ${todaysDate + 2}`).getDate()
  const monthInTwoDays: string = months[new Date(`${todaysMonth} ${todaysDate + 2}`).getMonth()]

  const dailyPredictions = () => {
    const mappedForecast = forecast.map((day: Forecast, i: number) => {
      return <ActivityBar
        i={i}
        city={city}
        forecast={day}
        weekday={weekdaysForActivityBars[i]}
        key={`activityBar-${i}`} />
    });

    return forecast.length ? mappedForecast : <Loader className='forecastLoader' /> ;
  }

  return (
    <div className='app'>
      <header className='pageTitle'>
        <h1>Feeder Forecaster</h1><sup>Beta</sup>
      </header>
      <h2>How Busy will your Bird Feeders Be?</h2>
      <main className='allSections'>
        <section className='regionSelectContainer'>
          <div className='regionSelect'>
            <RegionSelect setCity={setCity} setForecast={setForecast} setFoods={setFoods} />
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
            {'* select day to see full forecast'}
          </section>
          <section className='recommendationsSection'>
            <h2>Food</h2>
            <p>What Birds Want Right Now</p>

            <Recommendations city={city} foods={foods} />
          </section>
          <section className='speciesSection'>
            <h2>Birds</h2>
            <p>Species to Watch For</p>
            <Species city={city} />
          </section>
        </div>
      </main>
    </div>
  )
}

export default App