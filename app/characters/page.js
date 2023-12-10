"use client";

import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import { fetchAniListData } from '../utils/anilist';
import CharacterCard from './charactercard';

const CharacterPage = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const perPage = 30; // Number of characters per page

        const query = `
          query ($page: Int, $perPage: Int) {
            Page (page: $page, perPage: $perPage) {
              characters {
                image {
                  large
                  medium
                }
                name {
                  first
                  last
                }
                name {
                    native
                }
                age
                siteUrl 
              }
              pageInfo {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
              }
            }
          }
        `;

        const variables = {
          page : currentPage,
          perPage,
        };

        const data = await fetchAniListData(query, variables);
        console.log('API Response:', data);

        const characterList = data.Page.characters.map((character) => {
            // Check for null values and replace them with empty strings or other placeholders
            const firstName = character.name.first || '';
            const lastName = character.name.last || '';
  
            const name = `${lastName} ${firstName}`;
  
            const nameNative = character.name.native || '';
  
            const age = character.age !== null ? `${character.age}` : 'Unknown';
  
            return {
              name,
              nameNative,
              image: {
                large: character.image.large,
                medium: character.image.medium,
              },
              age,
              siteUrl: `${character.siteUrl}`,
            };
          });
        setCharacters(characterList);
        setTotalPages(data.Page.pageInfo.lastPage);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors as needed
      }
    };

    fetchData();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };


  return (
    <Layout>
      <div>
        <header className='text-4xl'>
        <h1>Characters</h1>
        </header>
        <ul className='flex flex-wrap'>
          {Array.isArray(characters) && characters.length > 0 ? (
            characters.map((character, index) => (
              <li key={index}>
                <CharacterCard 
                name={character.name} 
                nameNative={character.nameNative}
                image={character.image}
                age={character.age}
                siteUrl={character.siteUrl}
                />
              </li>
            ))
          ) : (
            <li>No characters available.</li>
          )}
        </ul>
            <div className='flex flex-col items-center justify-center'
            style={{marginRight: '290px'}}>
                <div className='bg-gradient-to-b from-black from-75% to-slate-300 border border-white m-2 p-4 w-full max-w-fit'>
                <button onClick={handlePrevPage} 
                disabled={currentPage === 1} 
                className='bg-red-700 text-white hover:bg-red-800 p-2'
                >
                    Previous
                </button>
                <span className='p-2'>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} 
                disabled={currentPage === totalPages} 
                className='bg-red-700 text-white hover:bg-red-800 p-2'
                >
                    Next
                </button>
                </div>
            </div>
      </div>
    </Layout>
  );
};

export default CharacterPage;