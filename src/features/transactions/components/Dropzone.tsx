import React, { useCallback, useState } from 'react';

interface DropzoneProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
  error: string | null;
}

export default function Dropzone({ onFileSelect, isLoading, error }: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFileSelect(file);
  }, [onFileSelect]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div className="max-w-3xl mx-auto animate-[fadeIn_0.6s_ease-out]">
      <div 
        className={`relative bg-slate-100 rounded-3xl p-16 md:p-24 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 ${isDragging ? 'border-blue-500 bg-blue-50 shadow-[0_0_0_4px_rgba(59,130,246,0.1)]' : 'border-dashed border-transparent hover:bg-slate-200'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          accept=".ofx" 
          onChange={handleFileChange} 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          title=""
        />
        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-slate-800">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15.01l1.41 1.41L11 14.83V19h2v-4.17l1.59 1.59L16 15.01 12.01 11 8 15.01z"/></svg>
        </div>
        <h3 className="text-xl font-bold mb-2 text-slate-900">Arraste seu arquivo .ofx aqui</h3>
        <p className="text-slate-500 text-sm">ou clique para selecionar do seu computador</p>
      </div>
      
      {isLoading && (
        <div className="mt-8 animate-[fadeIn_0.3s_ease-out]">
          <div className="flex justify-between text-xs font-bold text-slate-500 tracking-wider mb-2">
            <span>CONVERSÃO PARA JSON</span>
            <span>CARREGANDO...</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-slate-900 w-1/2 animate-pulse rounded-full"></div>
          </div>
        </div>
      )}
      {error && <div className="mt-6 text-red-500 text-center font-bold">{error}</div>}
    </div>
  );
}
