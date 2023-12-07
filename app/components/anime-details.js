import { useEffect, useState } from 'react';
import fetch from 'isomorphic-unfetch';

const AnimeDetails = () => {
  const [animeData, setAnimeData] = useState(null);
  const [charactersData, setCharactersData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch anime details
        const animeResponse = await fetch('https://graphql.anilist.co', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query ($id: Int, $page: Int, $perPage: Int, $search: String) {
                Page (page: $page, perPage: $perPage) {
                  pageInfo {
                    total
                    currentPage
                    lastPage
                    hasNextPage
                    perPage
                  }
                  media (id: $id, search: $search) {
                    id
                    title {
                      romaji
                    }
                  }
                }
              }
            `,
            variables: {
              id: 15125,
              page: 1,
              perPage: 3,
              search: "Fate/Zero",
            },
          }),
        });

        const animeData = await animeResponse.json();
        if (animeData.errors) {
            // Handle anime data errors here
            console.error('Anime data error:', animeData.errors);
            return;
          }
        setAnimeData(animeData.data.Page);

        // Fetch characters related to the anime
        const charactersResponse = await fetch('https://graphql.anilist.co', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query ($id: Int, $page: Int) {
                Media (id: $id) {
                  characters(page: $page) {
                    edges {
                      node {
                        id
                        name {
                          first
                          last
                        }
                      }
                      role
                    }
                  }
                }
              }
            `,
            variables: {
              id: 15125, // Use the anime ID you're interested in
              page: 1,
            },
          }),
        });

        const charactersData = await charactersResponse.json();
        if (charactersData.errors) {
            // Handle characters data errors here
            console.error('Characters data error:', charactersData.errors);
            return;
          }
        setCharactersData(charactersData.data.Media.characters.edges);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {animeData && charactersData ? (
        <div>
          <h1>AniList API Example</h1>
          <p>Total Items: {animeData.pageInfo.total}</p>
          <p>Current Page: {animeData.pageInfo.currentPage}</p>
          <p>Last Page: {animeData.pageInfo.lastPage}</p>
          <p>Has Next Page: {animeData.pageInfo.hasNextPage ? 'Yes' : 'No'}</p>
          <p>Items Per Page: {animeData.pageInfo.perPage}</p>
          <h2>Media:</h2>
          <ul>
            {animeData.media.map((media) => (
              <li key={media.id}>{media.title.romaji}</li>
            ))}
          </ul>
          <h2>Characters:</h2>
          <ul>
            {charactersData.map((character) => (
              <li key={character.node.id}>
                {character.node.name.first} {character.node.name.last} - Role: {character.role}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AnimeDetails;
