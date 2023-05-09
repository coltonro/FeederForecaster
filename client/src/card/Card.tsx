import React from 'react'
import './Card.css'

type Props = {
  foodObj?: {
    title: string,
    desc: string,
    imgPath: string
  },
  speciesObj?: {
    species: string,
    text: string
  }
}

const Card: React.FC<Props> = ({ foodObj, speciesObj }) => {
  const dataObj = foodObj ? foodObj : speciesObj;
  return (
    <div className='card'>
      <div className='cardImgContainer'>
        <img src={foodObj && foodObj.imgPath} className='cardImg'/>
      </div>
      <div className='cardText'>
        <div>
        <h3>{foodObj ? foodObj.title : speciesObj && speciesObj.species}</h3>
        </div>
        <div className='cardDesc'>
        <p>{foodObj ? foodObj.desc : speciesObj && speciesObj.text}</p>
        </div>
      </div>
    </div>
  )
}

export default Card