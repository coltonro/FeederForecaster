import React, { useState } from 'react'
import FoodCard from './FoodCard'
import './recommendations.css'

type Props = {
  city: null | string,
}

type Food = { 
  food: string,
  desc: string
}[]


const Recommendations: React.FC<Props> = ({ city }) => {
  const [food, setFood] = useState([
    {
      food: 'Black Oil Sunflower',
      desc: 'High quality protein'
    },
    {
      food: 'Suet',
      desc: 'Crude fat for warmth'
    },
    {
      food: 'Peanuts',
      desc: 'Favorite of Jays & Woodpeckers'
    }
  ])

  const displayCards = (food: Food) => {
    return (
      food.map((foodObj, i) => {
        return (
        <div className='cardContainer' key={`foodCard-${i}`}>
          <FoodCard foodObj={foodObj} />
        </div>
        )
      })
    )
  }

  return (
    <>
      {city && displayCards(food)}
    </>
  )

}

export default Recommendations