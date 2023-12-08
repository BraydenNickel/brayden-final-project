"use client";

import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import { fetchAniListData } from '../utils/anilist';

const AnimePage = () => {
  const [animeTitles, setAnimeTitles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDescriptions, setShowDescriptions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const perPage = 20; // Number of titles per page

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
      <div>
        <h1>Anime Titles</h1>
        <ul>
          {Array.isArray(animeTitles) && animeTitles.length > 0 ? (
            animeTitles.map((anime, index) => (
              <li key={index}>
                <img 
                src={anime.coverImage.large} 
                alt={anime.title.english}
                onClick={() => toggleDescription (anime.title.english || anime.title.romaji || anime.title.native)} />
                <h3>{anime.title.english || anime.title.romaji || anime.title.native}</h3>
                <p>Episodes: {anime.episodes}</p>
                <p>Genres: {anime.genres.join(', ')}</p>
                {showDescriptions[anime.title.english || anime.title.romaji || anime.title.native] && (
                  <p>Description: {anime.description}</p>
                )}
              </li>
            ))
          ) : (
            <li>No anime titles available.</li>
          )}
        </ul>
        <div>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous Page
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next Page
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default AnimePage;