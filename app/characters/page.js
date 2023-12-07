"use client";

import { useState } from 'react';
import Link from 'next/link';

const CharactersPage = () => {
  const [characterName, setCharacterName] = useState('');
  const [charactersData, setCharactersData] = useState(null);

  const fetchCharacters = async () => {
    try {
      const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query ($search: String, $page: Int, $perPage: Int) {
              Page (page: $page, perPage: $perPage) {
                characters(search: $search) {
                  nodes {
                    id
                    name {
                      first
                      last
                    }
                  }
                  pageInfo {
                    total
                    perPage
                    currentPage
                    lastPage
                    hasNextPage
                  }
                }
              }
            }
          `,
          variables: {
            search: characterName,
            page: 1,
            perPage: 10,
          },
        }),
      });

      const data = await response.json();
      if (data.errors) {
        console.error('Error fetching characters:', data.errors);
        return;
      }
      setCharactersData(data.data.Page.characters);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCharacterNameChange = (event) => {
    setCharacterName(event.target.value);
  };

  const handleSearchClick = () => {
    fetchCharacters();
  };

  return (
    <div>
      <h1>Characters</h1>
      <div>
        <label htmlFor="characterName">Search by Name:</label>
        <input
          type="text"
          id="characterName"
          value={characterName}
          onChange={handleCharacterNameChange}
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>
      {charactersData && (
        <div>
          <h2>Characters:</h2>
          <ul>
            {charactersData.nodes.map((character) => (
              <li key={character.id}>
                <Link href={`/characters/${character.id}`}>
                  <a>{character.name.first} {character.name.last}</a>
                </Link>
              </li>
            ))}
          </ul>
          <p>Page {charactersData.pageInfo.currentPage} of {charactersData.pageInfo.lastPage}</p>
        </div>
      )}
    </div>
  );
};

export default CharactersPage;
