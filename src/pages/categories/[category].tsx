import PostList from '@/components/PostList';
import { Post } from '@/types';
import { createClient } from '@/utils/supabase/server';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

type CategoryPostProps = {
  category: string;
  posts?: Post[];
};

const supabase = createClient({});

export const getStaticPaths = (async () => {
  const { data } = await supabase.from('Post').select('*');

  const categories = Array.from(new Set(data?.map((d) => d.category)));

  return {
    paths: categories.map((category) => ({ params: { category } })),
    fallback: 'blocking',
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const category = context.params?.category as string;

  const { data } = await supabase
    .from('Post')
    .select('*')
    .eq('category', category);

  return {
    props: {
      category: context.params?.category as string,
      posts:
        data?.map((post) => ({
          ...post,
          tags: JSON.parse(post.tags) as string[],
        })) ?? [],
    },
  };
}) satisfies GetStaticProps<CategoryPostProps>;

export default function CategoryPosts({
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <PostList category={category} />;
}
