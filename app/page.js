import Link from 'next/link';
import Layout from './components/layout';

export default function HomePage() {
  return (
    <Layout>
      <div>
        <h1>Welcome to Anime Central</h1>
        <p>Explore characters and anime with AniList data.</p>
        <Link href={"./characters"}> Characters</Link>
        <br />
        <Link href={"./anime"}>Anime</Link>
      </div>
    </Layout>
  )
};
