"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AnimeCentral from '../assets/AnimeCb.jpg'

const Layout = ({ children, onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        // Implement your search logic here
    };
    return (
        <div className='flex h-screen'>
          {/* Navigation Bar */}
          <nav className='flex flex-col bg-slate-500 text-white p-4 border-r border-white'>
            <div className='mb-4'>
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
            <header className='border-b border-white pb-2 mb-4'>
              <h1 className='text-red-400 text-4xl text-center'>Anime Cental</h1>
            </header>
            <ul className='text-2xl py-4 px-2'>
                <li className=''>
                    <Link href="/">Home</Link>
                </li>
                <li className='my-2'>
                    <Link href="/characters"> Characters </Link>
                </li>
                <li className='my-2'>
                    <Link href="/anime">Anime</Link>
                </li>
            </ul>
            {/* Search Bar */}
            <div className='mt-auto'>
              {/* Implement your search bar functionality here */}
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className='bg-green-700 text-white px-2 py-1 ml-2' onClick={handleSearch}>
                Search
              </button>
            </div>
          </nav>
    
          {/* Main Content */}
          <main className='flex-1 p-4'>
            {/* Page Content */}
            {children}
          </main>
    
          {/* Footer */}
          <footer>
            {/* Add footer content if needed */}
          </footer>
        </div>
      );
    };
export default Layout;
