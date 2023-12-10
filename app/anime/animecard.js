import React from 'react';

const AnimeCard = ({ image, title, episodes, genres, description, toggleDescription, showDescription }) => {
    const createMarkup = () => ({ __html: description });
  return (
    <div className=''>
        <div
        className="border border-gray-300 bg-white w-full max-w-md m-4 p-2 cursor-pointer"
        onClick={() => toggleDescription(title)}
        >
        <img src={image} alt={title} className="w-full object-cover mb-2" 
        style={{height: '500px', width: '500px'}}/>
        <div className='text-black'>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p>Episodes: {episodes}</p>
            <p>Genres: {genres.join(', ')}</p>
            </div>
            {showDescription && (
                <div className='text-black'>
                <p className="font-semibold mt-2">Description:</p>
                <div dangerouslySetInnerHTML={createMarkup()} />
                </div>
        )}
        </div>
    </div>
  );
};

export default AnimeCard;
