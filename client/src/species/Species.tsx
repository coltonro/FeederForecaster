import React, { useState } from 'react';
import { Group, Avatar, Text, Accordion } from '@mantine/core';

type Details = {
  1: String,
  2: String,
  3: String
}

type Birds = {
  title: string,
  desc: string,
  imgPath: string,
  details: Details
}

type Props = {
  city: null | string,
  birds: Birds[]
}

// const Species: React.FC<Props> = ({ city }) => {
//   const [species, setSpecies] = useState<SpeciesCard[]>([
//     {
//       species: 'Purple Martin',
//       text: 'Scouting males have arrived.'
//     }
//   ])
//   return (
//     <>
//       {/* {city && <FoodCard speciesObj={species}/>} */}
//       {city && species.map((bird, i) => {
//         return (
//           <div className='cardContainer' key={`speciesCard-${i}`}>
//             <Card speciesObj={bird} />
//           </div>
//         )
//       })}
//     </>
//   )
// }

const AccordionLabel: React.FC<Birds> = (bird) => {
  return (
    <Group noWrap>
      <Avatar src={bird.imgPath} radius="xl" size="lg" />
      <div>
        <Text>{bird.title}</Text>
        <Text size="sm" color="black" weight={400}>
          {bird.desc}
        </Text>
      </div>
    </Group>
  );
}

const Species = ({ city, birds }: Props) => {
  const items = birds.map((bird, i) => (
    <Accordion.Item value={bird.title} key={i}>
      <Accordion.Control>
        <AccordionLabel {...bird} />
      </Accordion.Control>
      <Accordion.Panel>
        <ul>
          <li>{bird.details[1]}</li>
          <li>{bird.details[2]}</li>
          <li>{bird.details[3]}</li>
        </ul>
        {/* <Text size="sm"><ul>{food.details[1]}</ul></Text>
        <Text size="sm">{food.details[2]}</Text>
        <Text size="sm">{food.details[3]}</Text> */}
      </Accordion.Panel>
    </Accordion.Item>
  ));
  
  return city ? <Accordion chevronPosition="right" variant="contained">{items}</Accordion> : null;
}

export default Species;