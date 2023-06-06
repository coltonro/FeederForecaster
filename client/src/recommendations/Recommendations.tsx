import React, { useState } from 'react';
import { Group, Avatar, Text, Accordion } from '@mantine/core';
import './recommendations.css';

type Details = {
  1: String,
  2: String,
  3: String
}

type Foods = {
  title: string,
  desc: string,
  imgPath: string,
  details: Details
}

type Props = {
  city: null | string,
  foods: Foods[]
};


// const Recommendations: React.FC<Props> = ({ city, foods }) => {

//     const displayCards = (foods: Food) => foods.map((foodObj, i) => {
//         return (
//           <div className='cardContainer' key={`foodCard-${i}`}>
//             <Card foodObj={foodObj} />
//           </div>
//         )
//       })

//     return (
//       <>
//         {city && displayCards(foods)}
//       </>
//     )
// }

const AccordionLabel: React.FC<Foods> = (food) => {
  return (
    <Group noWrap>
      <Avatar src={food.imgPath} radius="xl" size="lg" />
      <div>
        <Text>{food.title}</Text>
        <Text size="sm" color="black" weight={400}>
          {food.desc}
        </Text>
      </div>
    </Group>
  );
}

const Recommendations = ({ city, foods }: Props) => {
  const items = foods.map((food, i) => (
    <Accordion.Item value={food.title} key={i}>
      <Accordion.Control>
        <AccordionLabel {...food} />
      </Accordion.Control>
      <Accordion.Panel>
        <ul>
          <li>{food.details[1]}</li>
          <li>{food.details[2]}</li>
          <li>{food.details[3]}</li>
        </ul>
        {/* <Text size="sm"><ul>{food.details[1]}</ul></Text>
        <Text size="sm">{food.details[2]}</Text>
        <Text size="sm">{food.details[3]}</Text> */}
      </Accordion.Panel>
    </Accordion.Item>
  ));
  
  return city ? <Accordion chevronPosition="right" variant="contained">{items}</Accordion> : null;
}

export default Recommendations;