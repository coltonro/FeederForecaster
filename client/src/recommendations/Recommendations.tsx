import React, { useState } from 'react'
import Card from '../card/Card'
import './recommendations.css'

type Props = {
  city: null | string,
};

type Food = { 
  title: string,
  desc: string,
  imgPath: string
}[];


// const Recommendations: React.FC<Props> = ({ city }) => {
  const Recommendations = ( city: Props ) => {
  const [food, setFood] = useState([
    {
      title: 'Sunflower',
      desc: 'High quality protein',
      imgPath: '/sunflowerseeds.jpg'
    },
    {
      title: 'Suet',
      desc: 'Crude fat for energy',
      imgPath: '/suet_cake.png'
    },
    {
      title: 'Peanuts',
      desc: 'Favorite of Jays & Woodpeckers',
      imgPath: '/peanuts.jpg'
    }
  ])

  const displayCards = (food: Food) => {
    return (
      food.map((foodObj, i) => {
        return (
        <div className='cardContainer' key={`foodCard-${i}`}>
          <Card foodObj={foodObj} />
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