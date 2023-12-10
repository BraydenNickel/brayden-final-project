"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AnimeCentral from '../assets/AnimeCentral.jpg'
import '../styles/styles.css'

const Layout = ({ children, onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        // Implement your search logic here
    };

    return (
        <div className='flex h-screen'>
          {/* Navigation Bar */}
          <nav className='flex flex-col text-white p-4 border-r border-white fixed top-0 left-0 h-full navbar'>
            <div className=''>
              {/* Logo */}
              <Link href="/">
                  <Image
                    src={AnimeCentral}
                    alt="Anime Central Logo"
                    width={300}
                    height={50}
                    className=''
                  />
              </Link>
            </div>
            {/* Header */}
            <div className='bg-gradient-to-b from-black from-75% to-slate-300'>
                <ul className='text-2xl py-4 px-2'>
                    <li className='hover:text-red hover:bg-gray-800 transition duration-300 ease-in'>
                        <Link href="/">Home</Link>
                    </li>
                    <li className='my-2 hover:text-red hover:bg-gray-800 transition duration-300 ease-in'>
                        <Link href="/characters"> Characters </Link>
                    </li>
                    <li className='my-2 hover:text-red hover:bg-gray-800 transition duration-300 ease-in'>
                        <Link href="/anime">Anime</Link>
                    </li>
                </ul>
                <footer className='text-center text-xs'>
                    <p>Created by: Brayden Nickel</p>
                    <p>Data gathered from AniList API</p>
                </footer>
                            {/* Search Bar */}
                <div className='mx-3 mb-2'>
                {/* Implement your search bar functionality here */}
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='border border-gray-300'
                />
                <button className='bg-red-700 text-white' onClick={handleSearch}>
                    Search
                </button>
                </div>
            </div>
          </nav>
    
          {/* Main Content */}
          <main className='p-4 backdrop fixed top-0 left-0 h-full w-full' style={{ marginLeft: '333px', overflowY: 'auto'}}>
            {/* Page Content */}
            <div>
            {children}
            </div>
          </main>
    
          {/* Footer */}
          <footer>
            {/* Add footer content if needed */}
          </footer>
        </div>
      );
    };
export default Layout;
