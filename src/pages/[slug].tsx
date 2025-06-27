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
    <section className='relative min-h-screen flex flex-col overflow-hidden items-center justify-center text-center px-6 text-white'>
      <Image 
        src={post.image}
        alt={post.title}
        fill
        style={{ objectPosition: "center", objectFit: "cover" }}
        />
        <div className="z-10">
          <h1 className="text-4xl md:text-6xl font-bold">{post.title}</h1>
          <p className="text-lg md:text-2xl mt-4">{post.tags}</p>
        </div>
    </section>
      <main className="max-w-4xl mx-auto px-4 py-10">
        <article className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6">
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
