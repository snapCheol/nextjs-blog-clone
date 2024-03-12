import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className="h-[2000px]">
      <h1>NextJs Hello World</h1>
    </main>
  );
}
