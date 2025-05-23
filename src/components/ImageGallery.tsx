import React, { useState } from "react";
import { imageDescriptions} from "@/lib/data";
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
        {images.map((img, idx) => {
          // Remove query parameters from fileName
          const fileNameWithParams = img.split("/").pop() || img;
          const fileName = fileNameWithParams.split("?")[0];
          const description = imageDescriptions[fileName];
          const [showTooltip, setShowTooltip] = React.useState(false);
          const imgRef = React.useRef<HTMLImageElement>(null);

          // Tooltip portal state
          const [tooltipPos, setTooltipPos] = React.useState<{left: number, top: number, width: number} | null>(null);

          React.useEffect(() => {
            if (showTooltip && imgRef.current) {
              const rect = imgRef.current.getBoundingClientRect();
              const left = rect.left + rect.width / 2;
              const top = rect.top;
              setTooltipPos({ left, top, width: rect.width });
            } else {
              setTooltipPos(null);
            }
          }, [showTooltip]);

          return (
            <div key={idx} className="relative flex flex-col items-center">
              <div className="relative group/tooltip">
                <motion.img
                  ref={imgRef}
                  src={img}
                  alt={description || fileName}
                  className="w-20 h-20 object-cover rounded cursor-pointer border border-gray-200 dark:border-gray-700 hover:ring-2 hover:ring-purple-400 transition"
                  onClick={() => setSelected(idx)}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  whileHover={{ scale: 1.08 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                />
                {description && showTooltip && typeof window !== 'undefined' && tooltipPos && ReactDOM.createPortal(
                  <div
                    style={{
                      position: 'fixed',
                      left: Math.max(8, Math.min(tooltipPos.left, window.innerWidth - 8)),
                      top: tooltipPos.top - 12,
                      transform: 'translate(-50%, -100%)',
                      minWidth: '8rem',
                      maxWidth: '28rem',
                      background: 'rgba(0,0,0,0.9)',
                      color: 'white',
                      borderRadius: '0.375rem',
                      padding: '0.25rem 0.75rem',
                      fontSize: '0.75rem',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                      wordBreak: 'break-word',
                      whiteSpace: 'pre-line',
                      textAlign: 'center',
                      zIndex: 9999,
                      pointerEvents: 'none',
                    }}
                  >
                    {description}
                  </div>,
                  document.body
                )}
              </div>
            </div>
          );
        })}
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
                <div className="flex flex-col items-center w-full">
                  <motion.img
                    src={images[selected]}
                    alt={`Image ${selected + 1}`}
                    className="max-w-[95vw] max-h-[75vh] rounded-lg shadow-lg border-4 border-white dark:border-gray-800"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    onClick={e => e.stopPropagation()}
                  />
                  {/* Image description below the image, centered */}
                  {(() => {
                    const fileNameWithParams = images[selected].split("/").pop() || images[selected];
                    const fileName = fileNameWithParams.split("?")[0];
                    const description = imageDescriptions[fileName];
                    if (!description) return null;
                    return (
                      <div className="mt-6 px-4 py-2 bg-black/90 dark:bg-black/90 backdrop-blur-lg text-white text-sm rounded shadow-lg max-w-[90vw] w-fit text-center whitespace-pre-line break-words pointer-events-auto z-[101]">
                        {description}
                      </div>
                    );
                  })()}
                </div>
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
