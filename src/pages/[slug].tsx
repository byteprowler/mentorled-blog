import { GetStaticPaths, GetStaticProps } from 'next';
import blogData from '../data/blogData.json';
import { BlogPost } from '../types/blog';

interface BlogPostPageProps {
  post: BlogPost;
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Your detailed blog post layout */}
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        {/* Rest of your content */}
      </article>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = blogData.map(post => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = blogData.find(post => post.slug === params?.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};