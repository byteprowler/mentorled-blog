import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from "react"
import Image from 'next/image';
import { BlogPost } from '../types/BlogProps';

interface BlogViewerProps {
  filteredBlogs: BlogPost[];
}

const LETTER_DELAY = 0.050;
const BOX_FADE_DURATION = 0.25;

const SWAP_DELAY_IN_MS = 50000;

const Typewrite = ({ examples }) => {
  const [restartKey, setRestartKey] = useState(0);
  const current = examples[restartKey % examples.length];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRestartKey((prev) => prev + 1); // re-trigger animation
    }, SWAP_DELAY_IN_MS);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <p className="mb-2.5 text-sm font-light uppercase">
      <span className="inline-block size-2 rounded-md bg-neutral-950" />
      <span className="ml-2">
        Description:{" "}
        {current.split("").map((l, i) => (
          <motion.span
            key={`${restartKey}-${i}`} // force restart on key change
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: i * LETTER_DELAY,
              duration: 0,
            }}
            className="relative"
          >
            {l}
            <motion.span
              className="absolute bottom-[3px] left-[1px] right-0 top-[3px] bg-neutral-950"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                delay: i * LETTER_DELAY,
                times: [0, 0.1, 1],
                duration: BOX_FADE_DURATION,
                ease: "easeInOut",
              }}
            />
          </motion.span>
        ))}
      </span>
    </p>
  );
};

export default function BlogViewer({ filteredBlogs }: BlogViewerProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredBlogs.map((blog) => (
        <Link 
          key={blog.id}
          href={`/${blog.slug}`}
        >
          <motion.div
            className="block"
            whileHover={{ 
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300,
              damping: 15
            }}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer flex flex-col h-full">
              <div className="relative h-48 w-full">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                    {blog.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(blog.publish_date).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 line-clamp-2">{blog.title}</h3>
                <Typewrite examples={blog.excerpt} />
                <div className="flex flex-wrap gap-1 mb-3">
                  {blog.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-gray-500 mt-auto">By {blog.author}</div>
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}