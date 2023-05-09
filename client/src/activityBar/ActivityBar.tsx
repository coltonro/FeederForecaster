import React, { useState } from 'react';
import { Modal } from '@mantine/core';
import './ActivityBar.css';

type Props = {
    city: null | string,
    forecast: string,
    weekday: string,
    i: number
}

const ActivityBar: React.FC<Props> = ({ city, forecast, weekday, i }) => {
    const [open, setOpen] = useState(false); // controls modal
    const barHeight = city ? forecast === 'low' ? 'lowHeight' :
        forecast === 'medium' ? 'mediumHeight' :
            forecast === 'high' ? 'highHeight' :
                'minHeight' : '';

    // detailed descriptions for prediction modals
    const low = 'Higher temperatures and clear skies are often correlated with low bird activity. Like humans, they also like to be lazy in the shade on warm days.';
    const medium = '';
    const high = '';


    return (
        <>
            <div className='barAndText'>
                <div className='forecastText'>
                    {forecast === 'medium' ? 'moderate' : forecast}
                </div>
                <div className={`activityBar ${barHeight}`} onClick={() => setOpen(true)}>
                    <div className='dayText'>
                        {i === 0 ? "Today" : weekday.slice(0, 3)}
                        {/* <img src='/info-button.svg' className='infoSvg' /> */}
                    </div>
                </div>
            </div>

            <Modal
                className='predicitonModal'
                opened={open}
                onClose={() => setOpen(false)}
            >
                <h3>{`${i === 0 ? "Today" : weekday}'s Forecast`}</h3>
                {`Activity at your feeders will likely be ${forecast == 'medium' ? 'moderate' : forecast}.`}
                {``}
            </Modal>
        </>
    )
}

export default ActivityBar