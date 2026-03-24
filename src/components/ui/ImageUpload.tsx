import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from './button';
import { X, Upload } from 'lucide-react';

interface ImageUploadProps {
  onImageCropped: (file: File | null) => void;
  aspectRatio?: number; // Kept for prop compatibility
  label?: string;
  defaultImage?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageCropped, 
  aspectRatio, 
  label = "Upload Image",
  defaultImage
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultImage || null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      onImageCropped(file); // Passing the raw file directly without cropping
    }
  }, [onImageCropped]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    multiple: false,
    noClick: !!previewUrl // Disable full area click if preview exists so buttons work properly
  });

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl(null);
    onImageCropped(null);
  };

  return (
    <div className="space-y-3">
      {previewUrl ? (
        <div 
          {...getRootProps()} 
          className="relative rounded-xl overflow-hidden border group w-full bg-muted flex items-center justify-center cursor-default min-h-[150px]"
        >
            <input {...getInputProps()} />
            <img src={previewUrl} alt="Preview" className="w-full max-h-[300px] object-contain" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
               <Button variant="secondary" size="sm" onClick={(e) => { e.stopPropagation(); open(); }}>
                  <Upload className="w-4 h-4 mr-2"/> Change Image
               </Button>
               <Button variant="destructive" size="icon" onClick={clearSelection}>
                  <X className="w-4 h-4" />
               </Button>
            </div>
        </div>
      ) : (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-muted/50'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className={`w-10 h-10 mx-auto mb-4 ${isDragActive ? 'text-primary' : 'text-muted-foreground'}`} />
          <p className="font-medium text-sm mb-1">{isDragActive ? 'Drop image here...' : label}</p>
          <p className="text-xs text-muted-foreground">Drag & drop or click to browse (JPG, PNG, WEBP)</p>
        </div>
      )}
    </div>
  );
};
