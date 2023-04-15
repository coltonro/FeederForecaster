import { useState } from 'react'
import RegionSelect from './regionSelect/RegionSelect'
import ActivityBar from './activityBar/ActivityBar'
import Recommendations from './recommendations/Recommendations'
import Species from './species/Species'
import './App.css'

function App() {
  const [city, setCity] = useState(null)
  const [forecast, setForecast] = useState(Array<string>)

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"]
  const weekday: number = new Date().getDay()
  const weekdaysForActivityBars = [days[weekday], days[weekday + 1], days[weekday + 2], days[weekday + 3]]
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const todaysMonth: string = months[new Date().getMonth()]
  const todaysDate: number = new Date().getDate()
  const threeDaysFromToday: number = new Date(`${todaysMonth} ${todaysDate + 3}`).getDate()
  const monthInThreeDays: string = months[new Date(`${todaysMonth} ${todaysDate + 3}`).getMonth()]

const dailyPredictions = () => {
  return forecast.map((day, i) => {
    return <ActivityBar
      i={i}
      city={city}
      forecast={forecast[i]}
      weekday={weekdaysForActivityBars[i]}
      key={`activityBar-${i}`} />
  })
}

return (
  <div className='app'>
    <header className='pageTitle'>
      <h1>Feeder Forcaster</h1>
      <h2>How Busy will your Bird Feeders Be?</h2>
    </header>
    <main className='allSections'>
      <section className='regionSelect'>
        <RegionSelect setCity={setCity} setForecast={setForecast} />
      </section>
      <div className={!city ? 'displayNone' : undefined}>
        <div className='monthdate'>
          <h2>Feeder Activity</h2>
          <p>{`${todaysMonth} ${todaysDate} - ${monthInThreeDays} ${threeDaysFromToday}`}</p>
        </div>
        <section className='activityBarContainer'>
          {dailyPredictions()}
        </section>
        <section className='recommendationsSection'>
          <h2>Food</h2>
          <p>What Birds Need Right Now</p>

          <Recommendations city={city} />
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