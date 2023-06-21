import React, { useState } from 'react';
import { Modal } from '@mantine/core';
import './ActivityBar.css';

interface Forecast {
    activity: string,
    tempmax: number,
    cloudcover: string,
    windspeed: string,
    precipprob: number,
    description: string
}

type Props = {
    city: null | string,
    forecast: Forecast,
    weekday: string,
    i: number
}

const ActivityBar: React.FC<Props> = ({ city, forecast, weekday, i }) => {
    const [open, setOpen] = useState(false); // controls modal

//     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
//     const todaysMonth: string = months[new Date().getMonth()]
//   const todaysDate: number = new Date().getDate()
//     const twoDaysFromToday: number = new Date(`${todaysMonth} ${todaysDate + 2}`).getDate()
//   const monthInTwoDays: string = months[new Date(`${todaysMonth} ${todaysDate + 2}`).getMonth()]

    const barHeight = city ? forecast.activity === 'low' ? 'lowHeight' :
        forecast.activity === 'moderate' ? 'mediumHeight' :
            forecast.activity === 'high' ? 'highHeight' :
                'minHeight' : '';

    return (
        <>
            <div className='barAndText'>
                <div className='forecastText'>
                    {forecast.activity}
                </div>
                <div className={`activityBar ${barHeight}`} onClick={() => setOpen(true)}>
                    <div className='dayText'>
                        {i === 0 ? "Today" : `${weekday.slice(0, 3)}`}
                        {/* <img src='/info-button.svg' className='infoSvg' /> */}
                    </div>
                </div>
            </div>

            <Modal
                className='predicitonModal'
                opened={open}
                onClose={() => setOpen(false)}
            >
                <h3 className='modalHeader'>
                    {`${i === 0 ? "Today" : weekday}'s Forecast`}
                </h3>
                <div className='modalWeather'>
                    <div className='tempContainer'>
                        <p className='highOf'>High of</p>
                        <p>{Math.floor(forecast.tempmax)}&deg;F</p>
                    </div>
                    <p>{forecast.cloudcover.charAt(0).toUpperCase() + forecast.cloudcover.slice(1)}</p>
                    <p>
                        {forecast.windspeed.charAt(0).toUpperCase() + forecast.windspeed.slice(1)}
                        {forecast.windspeed === 'windy' ? null : ' Wind'}
                    </p>
                </div>
                <p>{`Bird activity at your feeders will likely be `}<strong>{forecast.activity}</strong>{`.`}</p>
                {/* <p>{`${forecast.description}`}</p> */}
                <p>{`With a high of ${Math.floor(forecast.tempmax)} degrees, ${forecast.cloudcover} skies, and ${forecast.windspeed} winds, birds will likely spend much of the day resting in the shade`}</p>
                <p>{`Activity will spike in the cooler morning hours, then remain fairly slow for the rest of the day.`}</p>
            </Modal>
        </>
    )
}

export default ActivityBar