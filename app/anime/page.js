"use client";

import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import { fetchAniListData } from '../utils/anilist';
import AnimeCard from './animecard';

const AnimePage = ( ) => {
  const [animeTitles, setAnimeTitles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDescriptions, setShowDescriptions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const perPage = 21; // Number of titles per page

        const query = `
          query ($page: Int, $perPage: Int) {
            Page (page: $page, perPage: $perPage) {
              media {
                coverImage {
                    large
                    medium
                    }
                title {
                  romaji
                  english
                  native
                }
                episodes
                description
                genres
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

        const titles = data.Page.media.map((media) => ({
          title: {
            english: media.title.english,
            romaji: media.title.romaji,
            native: media.title.native,
          },
            coverImage: {
                large: media.coverImage.large,
                medium: media.coverImage.medium,
            },
          episodes: media.episodes,
          description: media.description,
          genres: media.genres,
        }));

        setAnimeTitles(titles);
        setTotalPages(data.Page.pageInfo.lastPage);

        const initialShowDescriptions = titles.reduce((acc, anime) => {
            acc[anime.title.english || anime.title.romaji || anime.title.native] = false;
            return acc;
          }, {});
  
          setShowDescriptions(initialShowDescriptions);
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

  const toggleDescription = (titleKey) => {
    setShowDescriptions((prevShowDescriptions) => ({
      ...prevShowDescriptions,
      [titleKey]: !prevShowDescriptions[titleKey],
    }));
  };

  return (
    <Layout>
      <div className=''>
        <header className='text-4xl'>
        <h1>Anime Titles</h1>
        </header>
        <ul className='flex flex-wrap'>
            {Array.isArray(animeTitles) && animeTitles.length > 0 ? (
                animeTitles.map((anime, index) => (
                <li key={index}>
                    <AnimeCard
                    image={anime.coverImage.large}
                    title={anime.title.english || anime.title.romaji || anime.title.native}
                    episodes={anime.episodes}
                    genres={anime.genres}
                    description={anime.description}
                    toggleDescription={toggleDescription}
                    showDescription={showDescriptions[anime.title.english || anime.title.romaji || anime.title.native]}
                    />
                </li>
                ))
            ) : (
                <li>No anime titles available.</li>
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

export default AnimePage;