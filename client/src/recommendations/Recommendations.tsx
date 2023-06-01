import React, { useState } from 'react';
import { Group, Avatar, Text, Accordion } from '@mantine/core';
import Card from '../card/Card';
import './recommendations.css';

type Foods = {
  title: string,
  desc: string,
  imgPath: string,
  details: string
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

const charactersList = [
  {
    id: 'bender',
    image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
    label: 'Bender Bending Rodríguez',
    description: 'Fascinated with cooking, though has no sense of taste',
    content: "Bender Bending Rodríguez, (born September 4, 2996), designated Bending Unit 22, and commonly known as Bender, is a bending unit created by a division of MomCorp in Tijuana, Mexico, and his serial number is 2716057. His mugshot id number is 01473. He is Fry's best friend.",
  },

  {
    id: 'carol',
    image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
    label: 'Carol Miller',
    description: 'One of the richest people on Earth',
    content: "Carol Miller (born January 30, 2880), better known as Mom, is the evil chief executive officer and shareholder of 99.7% of Momcorp, one of the largest industrial conglomerates in the universe and the source of most of Earth's robots. She is also one of the main antagonists of the Futurama series.",
  },

  {
    id: 'homer',
    image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
    label: 'Homer Simpson',
    description: 'Overweight, lazy, and often ignorant',
    content: 'Homer Jay Simpson (born May 12) is the main protagonist and one of the five main characters of The Simpsons series(or show). He is the spouse of Marge Simpson and father of Bart, Lisa and Maggie Simpson.',
  },
];

interface AccordionLabelProps {
  label: string;
  image: string;
  description: string;
}

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
        <Text size="sm">{food.details}</Text>
      </Accordion.Panel>
    </Accordion.Item>
  ));
  
  return city ? <Accordion chevronPosition="right" variant="contained">{items}</Accordion> : null;
}

export default Recommendations;