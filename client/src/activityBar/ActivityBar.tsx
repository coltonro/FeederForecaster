import React from 'react';
import './ActivityBar.css';

type Props = {
    city: null | string,
    forecast: string,
    weekday: string,
    i: number
}

const ActivityBar: React.FC<Props> = ({ city, forecast, weekday, i }) => {
    const barHeight = city ? forecast === 'low' ? 'lowHeight' :
        forecast === 'medium' ? 'mediumHeight' :
            forecast === 'high' ? 'highHeight' :
                'minHeight' : '';


    return (
        <div className={`activityBar ${barHeight}`}>
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