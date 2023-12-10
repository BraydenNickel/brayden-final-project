import Layout from './components/layout';

export default function HomePage() {
  return (
    <Layout>
      <div className='bg-gradient-to-b from-black from-75% to-slate-300 border border-white m-2 p-4 w-full max-w-fit'>
        <h1 className=' text-4xl text-center'>Welcome to Anime Central</h1>
        <div className='text-2xl my-2 py-2'>
          <p>Explore characters and anime with data gathered from the AniList API.</p>
          <p>This is my final project for web development 2 at SAIT</p>
        </div>
      </div>
    </Layout>
  )
};
