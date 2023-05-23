import React, { useState } from 'react'
import Card from '../card/Card'
import './recommendations.css'

type Food = {
  title: string,
  desc: string,
  imgPath: string,
  details: string
}[];

type Props = {
  city: null | string,
  foods: Food
};


const Recommendations: React.FC<Props> = ({ city, foods }) => {

    const displayCards = (foods: Food) => foods.map((foodObj, i) => {
        return (
          <div className='cardContainer' key={`foodCard-${i}`}>
            <Card foodObj={foodObj} />
          </div>
        )
      })

    return (
      <>
        {city && displayCards(foods)}
      </>
    )
}

export default Recommendations