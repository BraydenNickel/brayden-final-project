"use client";

import { useState } from 'react';

const AnimePage = () => {
  const [animeName, setAnimeName] = useState('');
  const [animeData, setAnimeData] = useState(null);

  const fetchAnime = async () => {
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
                media(search: $search, type: ANIME) {
                  id
                  title {
                    romaji
                  }
                }
              }
            }
          `,
          variables: {
            search: animeName,
            page: 1,
            perPage: 10,
          },
        }),
      });

      const data = await response.json();
      if (data.errors) {
        console.error('Error fetching anime:', data.errors);
        return;
      }
      setAnimeData(data.data.Page.media);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAnimeNameChange = (event) => {
    setAnimeName(event.target.value);
  };

  const handleSearchClick = () => {
    fetchAnime();
  };

  return (
    <div>
      <h1>Anime Page</h1>
      <div>
        <label htmlFor="animeName">Search by Name:</label>
        <input
          type="text"
          id="animeName"
          value={animeName}
          onChange={handleAnimeNameChange}
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>
      {animeData && (
        <div>
          <h2>Anime:</h2>
          <ul>
            {animeData.map((anime) => (
              <li key={anime.id}>{anime.title.romaji}</li>
            ))}
          </ul>
          {/* Pagination can be added here */}
        </div>
      )}
    </div>
  );
};

export default AnimePage;
