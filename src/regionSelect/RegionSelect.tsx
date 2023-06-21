import React from 'react'
import { Select } from '@mantine/core';
// @ts-ignore 
import { fetchUrl } from '../../fetchUrl';
import './RegionSelect.css';

type Props = {
  setCity: React.Dispatch<React.SetStateAction<any>>,
  setForecast: React.Dispatch<React.SetStateAction<any>>
  setFoods: React.Dispatch<React.SetStateAction<any>>
};

const RegionSelect: React.FC<Props> = ({ setCity, setForecast, setFoods }) => {

  const getWeather = (e: string | null) => {
    setCity(null)
    fetch(`${fetchUrl}/cityForecast`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'

      },
      body: JSON.stringify({
        city: e
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log('data: ', data)
        setForecast(data.forecast)
        setFoods(data.foods)
      })
    setCity(e)
  }

  return (
      <Select
        label="Select a Region"
        placeholder="Nearby City"
        onChange={e => getWeather(e)}
        data={[
          { value: 'Austin', label: 'Austin' },
          { value: 'Dallas', label: 'Dallas' },
          { value: 'Houston', label: 'Houston' },
          { value: 'San Antonio', label: 'San Antonio' },
        ]}
      />
  )
}

export default RegionSelect