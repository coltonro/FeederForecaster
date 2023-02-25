import React from 'react'
import './FoodCard.css'

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

const FoodCard: React.FC<Props> = ({ foodObj, speciesObj }) => {
  return (
    <div className='foodCard'>
      <div className='foodImg'>
      </div>
      <div className='cardText'>
        {/* <h3>{foodObj && foodObj.food}</h3> */}
        <h3>{foodObj ? foodObj.food : speciesObj && speciesObj.species}</h3>
        <div className='cardDesc'>
        {foodObj ? foodObj.desc : speciesObj && speciesObj.text}
        </div>
      </div>
    </div>
  )
}

export default FoodCard