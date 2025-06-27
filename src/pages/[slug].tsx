import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import blogData from '../data/blogData.json';
import { BlogPost } from '../types/BlogProps';
import Image from 'next/image';

interface BlogPostPageProps {
  post: BlogPost;
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div className="text-center py-20 text-gray-500">Loading post...</div>;
  }

  return (
    <>
      <main className="max-w-4xl mx-auto px-4 py-10">
        <article className="bg-white rounded-2xl shadow-md overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          <div className="p-6">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="text-sm text-gray-500 mb-6">
              By <span className="font-semibold">{post.author}</span> • {post.publish_date}
            </div>

            {/* BLOG BODY */}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = blogData.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: true, // allows fallback loader
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = blogData.find((p) => p.slug === params?.slug);

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
