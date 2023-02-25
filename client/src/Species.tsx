import React, { useState } from 'react'
import FoodCard from './FoodCard'
import './FoodCard.css'

type Props = {
  city: null | string
}

type SpeciesCard = {
  species: string,
  text: string,
}

const Species: React.FC<Props> = ({ city }) => {
  const [species, setSpecies] = useState<SpeciesCard[]>([
    {
      species: 'Purple Martin',
      text: 'Scouting males have arrived.'
    }
  ])
  return (
    <>
      {/* {city && <FoodCard speciesObj={species}/>} */}
      {city && species.map(bird => {
        return (
          <div className='cardContainer'>
            <FoodCard speciesObj={bird} />
          </div>
        )
      })}
    </>
  )
}

export default Species