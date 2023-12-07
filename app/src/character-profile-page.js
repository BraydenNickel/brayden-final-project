import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import fetch from 'isomorphic-unfetch';

const CharacterProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [characterData, setCharacterData] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch('https://graphql.anilist.co', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query ($id: Int) {
                Character(id: $id) {
                  id
                  name {
                    first
                    last
                  }
                  image {
                    large
                  }
                  description
                  gender
                  dateOfBirth {
                    year
                    month
                    day
                  }
                  age
                }
              }
            `,
            variables: {
              id: Number(id),
            },
          }),
        });

        const data = await response.json();
        if (data.errors) {
          console.error('Error fetching character data:', data.errors);
          return;
        }
        setCharacterData(data.data.Character);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (id) {
      fetchCharacter();
    }
  }, [id]);

  return (
    <div>
      {characterData ? (
        <div>
          <h1>{characterData.name.first} {characterData.name.last}</h1>
          <Image src={characterData.image.large} alt={`${characterData.name.first} ${characterData.name.last}`} />
          <p>{characterData.description}</p>
          <p>Gender: {characterData.gender}</p>
          <p>Date of Birth: {characterData.dateOfBirth.year}-{characterData.dateOfBirth.month}-{characterData.dateOfBirth.day}</p>
          <p>Age: {characterData.age}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CharacterProfilePage;
