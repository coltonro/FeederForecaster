import React from 'react'
import './Card.css'

type Props = {
  foodObj?: {
    food: string,
    desc: string
  },
  speciesObj?: {
    species: string,
    text: string
  }
}

const Card: React.FC<Props> = ({ foodObj, speciesObj }) => {
  return (
    <div className='card'>
      <div className='cardImg'>
      </div>
      <div className='cardText'>
        {/* <h3>{foodObj && foodObj.food}</h3> */}
        <h3>{foodObj ? foodObj.food : speciesObj && speciesObj.species}</h3>
        <div className='cardDesc'>
        <p>{foodObj ? foodObj.desc : speciesObj && speciesObj.text}</p>
        </div>
      </div>
    </div>
  )
}

export default Card