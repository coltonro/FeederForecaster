import React, { useState } from 'react'
import { Select } from '@mantine/core';
import './RegionSelect.css';

type Props = {
  setCity: React.Dispatch<React.SetStateAction<any>>
};

type WeatherData = {
  days: {
    cloudcover: number,
    datetime: string,
    precip: number,
    precipprob: number,
    tempmax: number,
    tempmin: number,
    windspeed: number
  }[]
} | null;

const RegionSelect: React.FC<Props> = ({ setCity }) => {
  const todaysDate = new Date().toISOString().split('T')[0]

  const getWeather = (e: string | null) => {
    fetch('http://localhost:8080/weather', {
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
    })
    setCity(e)
  }

  return (
    <Select
      label="Select a Region"
      placeholder="Nearby City"
      onChange={e => getWeather(e)}
      data={[
        { value: 'austin', label: 'Austin' },
        { value: 'dallas', label: 'Dallas' },
        { value: 'houston', label: 'Houston' },
        { value: 'sanAntonio', label: 'San Antonio' },
      ]}
    />
  )
}

export default RegionSelect