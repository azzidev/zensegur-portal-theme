import React, { useState, useEffect } from 'react';
import { useTheme } from '../context';

interface ImageProps {
  src: string | string[];
  alt?: string;
  width?: number | string;
  height?: number | string;
  preview?: boolean;
  carousel?: boolean;
  fallback?: string;
  placeholder?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const Image: React.FC<ImageProps> = ({ 
  src,
  alt,
  width,
  height,
  preview = false,
  carousel = false,
  fallback,
  placeholder,
  style,
  className
}) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = Array.isArray(src) ? src : [src];
  const currentSrc = images[currentIndex];
  const hasMultiple = images.length > 1;

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

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!previewVisible) return;
    if (e.key === 'Escape') setPreviewVisible(false);
    if (e.key === 'ArrowRight' && hasMultiple) nextImage();
    if (e.key === 'ArrowLeft' && hasMultiple) prevImage();
  };

  useEffect(() => {
    if (previewVisible) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [previewVisible, hasMultiple]);

  if (loading && placeholder) {
    return <div className={className} style={imageStyle}>{placeholder}</div>;
  }

  if (error && fallback) {
    return (
      <img 
        src={fallback} 
        alt={alt}
        className={className}
        style={imageStyle}
        onClick={handlePreview}
      />
    );
  }

  if (error) {
    return (
      <div className={className} style={{
        ...imageStyle,
        backgroundColor: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.colors.textSecondary
      }}>
        Falha ao carregar
      </div>
    );
  }

  return (
    <>
      <div className={className} style={{ position: 'relative', display: 'inline-block' }}>
        <img
          src={currentSrc}
          alt={alt}
          style={imageStyle}
          onLoad={handleLoad}
          onError={handleError}
          onClick={handlePreview}
        />
        
        {carousel && hasMultiple && (
          <>
            <button
              onClick={prevImage}
              style={{
                position: 'absolute',
                left: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.6)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                fontSize: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.6)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                fontSize: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ›
            </button>
            <div style={{
              position: 'absolute',
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '4px'
            }}>
              {images.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: index === currentIndex ? 'white' : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      {previewVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            cursor: 'zoom-out'
          }}
          onClick={() => setPreviewVisible(false)}
        >
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
            <img
              src={currentSrc}
              alt={alt}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
              onClick={(e) => e.stopPropagation()}
            />
            
            {hasMultiple && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  style={{
                    position: 'absolute',
                    left: '-60px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '48px',
                    height: '48px',
                    cursor: 'pointer',
                    fontSize: '24px'
                  }}
                >
                  ‹
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  style={{
                    position: 'absolute',
                    right: '-60px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '48px',
                    height: '48px',
                    cursor: 'pointer',
                    fontSize: '24px'
                  }}
                >
                  ›
                </button>
              </>
            )}
            
            <button
              onClick={() => setPreviewVisible(false)}
              style={{
                position: 'absolute',
                top: '-60px',
                right: '0',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                cursor: 'pointer',
                fontSize: '24px'
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};