"use client";

import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import { fetchAniListData } from '../utils/anilist';
import Image from 'next/image';

const CharacterPage = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const page = 1; // You can adjust this based on your requirements
        const perPage = 10; // Number of characters per page

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
          page,
          perPage,
        };

        const data = await fetchAniListData(query, variables);
        console.log('API Response:', data);

        const characterList = data.Page.characters.map((character) => ({
          name: `${character.name.first} ${character.name.last}`,
          image: {
            large: character.image.large,
            medium: character.image.medium,
          },
        }));
        console.log('Characters:', characterList);

        setCharacters(characterList);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors as needed
      }
    };

    fetchData();
  }, []); // Empty dependency array to execute the effect only once on mount

  return (
    <Layout>
      <div>
        <h1>Characters</h1>
        <ul>
          {Array.isArray(characters) && characters.length > 0 ? (
            characters.map((character, index) => (
              <li key={index}>
                <p>Name: {character.name}</p>
                <img src={character.image.medium} alt={character.name} />
              </li>
            ))
          ) : (
            <li>No characters available.</li>
          )}
        </ul>
      </div>
    </Layout>
  );
};

export default CharacterPage;