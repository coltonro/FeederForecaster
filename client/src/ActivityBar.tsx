import React from 'react'
import './ActivityBar.css'

type Props = {
    city: null | string,
    forecast: {
        activity: string;
    },
    weekday: string
}

const ActivityBar: React.FC<Props> = ({ city, forecast, weekday }) => {
    const barWidth = city ? forecast.activity === 'Low' ? 'lowWidth' :
        forecast.activity === 'Medium' ? 'mediumWidth' :
            forecast.activity === 'High' ? 'highWidth' :
                'minWidth' : '';


    return (
        <div className={`activityBar ${barWidth}`}>
            <div className='dayText'>
                {weekday}
            </div>
            <div className='activityLevelText'>
                {city ? forecast.activity : ''}
            </div>
        </div>
    )
}

export default ActivityBar