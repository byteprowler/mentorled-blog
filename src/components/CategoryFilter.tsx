import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface CatProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerDirection: -1,
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

export default function CategoryFilter({ categories, activeCategory, onSelect }: CatProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full md:w-48">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        whileTap={{ scale: 0.98 }}
      >
        <span>{activeCategory}</span>
        <motion.span variants={iconVariants} animate={isOpen ? "open" : "closed"}>
          <FiChevronDown />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            variants={wrapperVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="absolute z-10 w-full mt-1 origin-top bg-white rounded-lg shadow-lg overflow-hidden"
            style={{ transformOrigin: "top" }}
          >
            {["All", ...categories].map((category) => (
              <motion.li
                key={category}
                variants={itemVariants}
                className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                  activeCategory === category ? "bg-blue-100 text-blue-600" : ""
                }`}
                onClick={() => {
                  onSelect(category);
                  setIsOpen(false);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {category}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}