import { useState } from 'react'
import RegionSelect from './RegionSelect'
import ActivityBar from './ActivityBar'
import Recommendations from './Recommendations'
import Species from './Species'
import './App.css'

function App() {
  const [city, setCity] = useState(null)
  const [forecast, setForcast] = useState([
    { activity: 'Medium' },
    { activity: 'Medium' },
    { activity: 'Low' },
    { activity: 'High' },
  ])

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"]
  const weekday: number = new Date().getDay()
  const weekdaysForActivityBars = [days[weekday], days[weekday + 1], days[weekday + 2], days[weekday + 3]]
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const todaysMonth: string = months[new Date().getMonth()]
  const todaysDate: number = new Date().getDate()
  const threeDaysFromToday: number = new Date().getDate() + 3
  const monthInThreeDays: string = months[new Date(threeDaysFromToday).getMonth()]

  const dailyPredictions = () => {
    return forecast.map((day, i) => {
      return <ActivityBar
        city={city}
        forecast={forecast[i]}
        weekday={weekdaysForActivityBars[i]}
        key={`activityBar-${i}`} />
    })
  }

  return (
    <>
      <header className='pageTitle'>
        <h1>Feeder Forcaster</h1>
        <h2>How Busy will your Bird Feeders Be?</h2>
        {/* <h2>How Hungry will your Birds Be?</h2> */}
      </header>
      <main className='allSections'>
        <section className='regionSelect'>
          <RegionSelect setCity={setCity} />
        </section>
        <div className='monthdate'>
          <h2>{`${todaysMonth} ${todaysDate} - ${monthInThreeDays} ${threeDaysFromToday}`}</h2>
        </div>
        <section className='activityBarContainer'>
          {dailyPredictions()}
        </section>
        <section className='recommendationsSection'>
          <h2>What Birds Need Right Now</h2>

          <Recommendations city={city} />
        </section>
        <section className='speciesSection'>
          <h2>Species to Watch For</h2>
          <Species city={city} />
        </section>
      </main>
    </>
  )
}

export default App