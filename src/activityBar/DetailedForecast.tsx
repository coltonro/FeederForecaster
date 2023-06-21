import { useState } from 'react';
import { Accordion } from '@mantine/core';

type Forecast = {
    activity: string,
    tempmax: number,
    cloudcover: string,
    windspeed: string,
    precipprob: number,
    description: string
}[];

type Props = {
    forecast: Forecast
};

function DetailedForecast({ forecast }: Props) {
    const [value, setValue] = useState<string | null>(null);
    return (
        <Accordion value={value} onChange={setValue} variant="filled" defaultValue="customization">
            <Accordion.Item value="customization">
                <Accordion.Control>Full Forecast</Accordion.Control>
                <Accordion.Panel>
                    <p>{`Bird activity at your feeders will likely be `}<strong>{forecast[0].activity}</strong>{`.`}</p>
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    );
};

export default DetailedForecast;