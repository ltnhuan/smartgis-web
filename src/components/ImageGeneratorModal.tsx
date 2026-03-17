import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { X, Image as ImageIcon, Loader2 } from 'lucide-react';

interface ImageGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string) => void;
  defaultPrompt?: string;
}

export default function ImageGeneratorModal({ isOpen, onClose, onSelectImage, defaultPrompt = '' }: ImageGeneratorModalProps) {
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '16:9',
        },
      });

      if (response.generatedImages && response.generatedImages.length > 0) {
        const base64EncodeString = response.generatedImages[0].image.imageBytes;
        const imageUrl = `data:image/jpeg;base64,${base64EncodeString}`;
        setGeneratedImage(imageUrl);
      } else {
        setError('Không thể tạo ảnh. Vui lòng thử lại.');
      }
    } catch (err: any) {
      console.error('Error generating image:', err);
      setError(err.message || 'Đã xảy ra lỗi khi tạo ảnh.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = () => {
    if (generatedImage) {
      onSelectImage(generatedImage);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-emerald-600" />
            Tạo ảnh bằng AI (Imagen)
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả hình ảnh muốn tạo (Prompt)</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ví dụ: Một thành phố thông minh với các tòa nhà xanh, công nghệ GIS, bản đồ số 3D..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              rows={3}
            />
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Đang tạo ảnh...
              </>
            ) : (
              'Tạo ảnh'
            )}
          </button>
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          {generatedImage && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Kết quả:</h4>
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <img src={generatedImage} alt="Generated" className="w-full h-auto" />
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-200 flex justify-end gap-3 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 font-medium"
          >
            Hủy
          </button>
          <button
            onClick={handleSelect}
            disabled={!generatedImage}
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sử dụng ảnh này
          </button>
        </div>
      </div>
    </div>
  );
}
