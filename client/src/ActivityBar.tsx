import React from 'react'
import './ActivityBar.css'

type Props = {
    city: null | string,
    forecast: {
        activity: string;
    },
    weekday: string,
    i: number
}

const ActivityBar: React.FC<Props> = ({ city, forecast, weekday, i }) => {
    const barWidth = city ? forecast.activity === 'Low' ? 'lowWidth' :
        forecast.activity === 'Medium' ? 'mediumWidth' :
            forecast.activity === 'High' ? 'highWidth' :
                'minWidth' : '';


    return (
        <div className={`activityBar ${barWidth}`}>
            <div className='dayText'>
                {i === 0 ? "Today" : weekday}
            </div>
            <div className='activityLevelText'>
                {/* {city ? forecast.activity : ''} */}
            </div>
        </div>
    )
}

export default ActivityBar