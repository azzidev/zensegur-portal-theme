import React, { useState } from 'react';
import { useTheme } from '../context';

interface ImageProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  preview?: boolean;
  fallback?: string;
  placeholder?: React.ReactNode;
  style?: React.CSSProperties;
}

export const Image: React.FC<ImageProps> = ({ 
  src,
  alt,
  width,
  height,
  preview = false,
  fallback,
  placeholder,
  style 
}) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);

  const imageStyle: React.CSSProperties = {
    width,
    height,
    objectFit: 'cover',
    cursor: preview ? 'pointer' : 'default',
    ...style
  };

  const handleLoad = () => setLoading(false);
  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  const handlePreview = () => {
    if (preview) setPreviewVisible(true);
  };

  if (loading && placeholder) {
    return <div style={imageStyle}>{placeholder}</div>;
  }

  if (error && fallback) {
    return (
      <img 
        src={fallback} 
        alt={alt}
        style={imageStyle}
        onClick={handlePreview}
      />
    );
  }

  if (error) {
    return (
      <div style={{
        ...imageStyle,
        backgroundColor: theme.colors.border,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.colors.textSecondary
      }}>
        ❌
      </div>
    );
  }

  return (
    <>
      <img
        src={src}
        alt={alt}
        style={imageStyle}
        onLoad={handleLoad}
        onError={handleError}
        onClick={handlePreview}
      />
      {previewVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setPreviewVisible(false)}
        >
          <img
            src={src}
            alt={alt}
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain'
            }}
          />
        </div>
      )}
    </>
  );
};