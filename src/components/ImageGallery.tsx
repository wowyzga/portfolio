import React, { useState } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {images.map((img, idx) => (
          <motion.img
            key={idx}
            src={img}
            alt={`Image ${idx + 1}`}
            className="w-20 h-20 object-cover rounded cursor-pointer border border-gray-200 dark:border-gray-700 hover:ring-2 hover:ring-purple-400 transition"
            onClick={() => setSelected(idx)}
            whileHover={{ scale: 1.08 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          />
        ))}
      </div>
      {typeof window !== 'undefined' && selected !== null && (
        ReactDOM.createPortal(
          <AnimatePresence>
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center w-screen h-screen bg-black/90 backdrop-blur-lg pt-[4.5rem] pb-[5rem]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl font-bold bg-black/50 rounded-full px-4 py-2 hover:bg-black/80 transition focus:outline-none focus:ring-2 focus:ring-purple-400"
                  onClick={e => {
                    e.stopPropagation();
                    setSelected((prev) => prev !== null ? (prev - 1 + images.length) % images.length : 0);
                  }}
                  aria-label="Previous image"
                >
                  &#8592;
                </button>
                <motion.img
                  src={images[selected]}
                  alt={`Image ${selected + 1}`}
                  className="max-w-[95vw] max-h-[75vh] rounded-lg shadow-lg border-4 border-white dark:border-gray-800"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={e => e.stopPropagation()}
                />
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl font-bold bg-black/50 rounded-full px-4 py-2 hover:bg-black/80 transition focus:outline-none focus:ring-2 focus:ring-purple-400"
                  onClick={e => {
                    e.stopPropagation();
                    setSelected((prev) => prev !== null ? (prev + 1) % images.length : 0);
                  }}
                  aria-label="Next image"
                >
                  &#8594;
                </button>
                <button
                  className="absolute top-8 right-10 text-white text-4xl font-bold bg-black/50 rounded-full px-4 py-2 hover:bg-black/80 transition focus:outline-none focus:ring-2 focus:ring-purple-400"
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )
      )}
    </div>
  );
}
