import PostList from '@/components/PostList';
import { GetServerSideProps } from 'next';

type TagPostProps = {
  tag: string;
};

export default function TagPosts({ tag }: TagPostProps) {
  return <PostList tag={tag} />;
}

export const getServerSideProps: GetServerSideProps<TagPostProps> = async ({
  query,
}) => {
  return {
    props: {
      tag: query.tag as string,
    },
  };
};
