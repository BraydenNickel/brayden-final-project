import React from 'react';
import Link from 'next/link';

const CharacterCard = ({ name, nameNative, image, age, siteUrl }) => {
  return (
    <div className='p-4'>
      <div className="border border-gray-300 bg-white w-full max-w-md m-4 p-2 cursor-pointer"
      style={{width: "250px"}}>
        <img src={image.large} alt={name} className="w-full mb-2"
        style={{height: '300px'}}/>
        <div className='text-black flex-grow' >
          <p className='text-lg font-semibold'>{name}</p>
          <p className='text-lg font-semibold'>{nameNative}</p>
          <p className='text-lg font-semibold'>Age: {age}</p>
          <div className='italic text-blue-900 underline'>
            <Link href={siteUrl}>Profile</Link>
         </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
