import React from 'react'
import { Select } from '@mantine/core';
import './RegionSelect.css';

type Props = {
  setCity: React.Dispatch<React.SetStateAction<any>>
};

const RegionSelect: React.FC<Props> = ({ setCity }) => {

  const regionHandler = (e: string | null) => {
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
      onChange={e => regionHandler(e)}
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