"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AnimeCentral from '../assets/AnimeCb.jpg'

const Layout = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        // Implement your search logic here
    };
  return (
    <div className='flex flex-col h-screen'>
      {/* Header */}
      <header className='flex justify-between items-center p-4 bg-grey-800 text-white'>
        <div className='flex items-center'>
          {/* Logo */}
          <Link href={"./page"}>
            <Image src={AnimeCentral} 
            alt="Anime Central Logo"
            width={300}
            height={50}
            className='rounded-full px-2 py-4'
             />
          </Link>
        </div>
        <div>
            <h1 className='text-red-400 text-4xl'>Anime Cental</h1>
        </div>
        {/* Search Bar */}
        <div className='ml-4'>
          {/* Implement your search bar functionality here */}
          <input 
          className='border border-grey-500 rounded px-2 py-1'
          type="text" 
          placeholder="Search..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}/>
          <button className='bg-grey-500 text-white px-2 py-1 ml-2' onClick={handleSearch}>
            Search
          </button>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className='flex flex-col bg-grey-800 text-white p-4'>
        <ul className='text-3xl'>
          <li className='mb-2'>
            <Link href={"./characters"}> Characters </Link>
          </li>
          <li>
            <Link href={"./anime"}>Anime</Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer>
        {/* Add footer content if needed */}
      </footer>
    </div>
    );
}
export default Layout;
