import React, { useState } from 'react'
import Card from './Card'

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
      {city && species.map((bird, i) => {
        return (
          <div className='cardContainer' key={`speciesCard-${i}`}>
            <Card speciesObj={bird} />
          </div>
        )
      })}
    </>
  )
}

export default Species