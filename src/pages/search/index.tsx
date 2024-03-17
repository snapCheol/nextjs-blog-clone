import dynamic from 'next/dynamic';

const SearchPage = dynamic(() => import('@/components/SearcPage'), {
  ssr: false,
});

export default function Search() {
  return <SearchPage />;
}
