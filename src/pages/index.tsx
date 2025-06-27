import { useState, useEffect } from 'react';
import BlogViewer from '@/components/BlogViewer';
import CategoryFilter from '@/components/CategoryFilter';
import blogData from '../data/blogData.json';
import { BlogPost } from '../types/BlogProps';

export default function Home() {
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>(blogData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    let results = blogData;
    
    if (selectedCategory !== 'All') {
      results = results.filter(blog => blog.category === selectedCategory);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(blog => 
        blog.title.toLowerCase().includes(term) ||
        blog.excerpt.toLowerCase().includes(term) ||
        blog.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    setFilteredBlogs(results);
  }, [searchTerm, selectedCategory]);

  const categories = Array.from(new Set(blogData.map(blog => blog.category)));

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
        <h1 className="text-3xl font-bold mb-6 text-center items-center">BBgs</h1>
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search Blog"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
              />
          </div>
          <CategoryFilter
            categories={categories}
            activeCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
      </div>

      <BlogViewer filteredBlogs={filteredBlogs} />
    </main>
  );
}