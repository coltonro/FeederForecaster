import React from 'react'
import { Select } from '@mantine/core';
import './RegionSelect.css';

type Props = {
  setCity: React.Dispatch<React.SetStateAction<any>>
};

const RegionSelect: React.FC<Props> = ({ setCity }) => {
  return (
    <Select
      label="Select a Region"
      placeholder="Nearby City"
      onChange={e => setCity(e)}
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