'use client';

import { X } from "lucide-react";
import { ImageBlockContent } from "./projectQuery";

interface LightboxProps {
  imageData: ImageBlockContent | null;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ imageData, onClose }) => {
  if (!imageData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
      >
        <X className="w-8 h-8" />
      </button>
      
      <div className="max-w-6xl max-h-full">
        <img
          src={imageData.url}
          alt={imageData.alt}
          className="max-w-full max-h-full object-contain"
        />
        {imageData.caption && (
          <div className="text-center mt-4">
            <p className="text-white text-lg">{imageData.caption}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lightbox;