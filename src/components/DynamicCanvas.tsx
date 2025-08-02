import React, { useEffect, useRef } from 'react';
import { useTheme } from '../hooks/useTheme';

interface DynamicCanvasProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
  words?: string[];
  showWords?: boolean;
  variant?: 'zen' | 'loading' | 'processing';
}

const DynamicCanvas: React.FC<DynamicCanvasProps> = ({
  width = '100%',
  height = '100vh',
  className,
  style,
  words = [
    "Processando seus dados...",
    "Quase lá...",
    "Finalizando...",
    "Concluído!"
  ],
  showWords = true,
  variant = 'zen'
}) => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const timeRef = useRef(0);
  const wordIndexRef = useRef(0);
  const wordTimeRef = useRef(0);
  const wordOpacityRef = useRef(0);
  
  const calculateReadingTime = (word: string): number => {
    const baseTime = variant === 'loading' ? 60 : 80;
    const charTime = word.length * (variant === 'loading' ? 8 : 10);
    return Math.min(Math.max(baseTime + charTime, 40), variant === 'loading' ? 120 : 200);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const newWidth = rect.width;
      const newHeight = rect.height;
      
      if (canvas.width !== newWidth || canvas.height !== newHeight) {
        canvas.width = newWidth;
        canvas.height = newHeight;
      }
    };

    const drawGeometricPattern = () => {
      const time = timeRef.current * 0.01;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const viewportSize = Math.min(canvas.width, canvas.height);
      const scale = viewportSize / 600;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isNarrow = canvas.width < canvas.height / 2;
      const circleCount = variant === 'loading' ? (isNarrow ? 12 : 8) : (isNarrow ? 17 : 10);
      const circleSpacing = isNarrow ? 47 : 40;
      const speed = variant === 'loading' ? 0.8 : 1;
      
      for (let i = 1; i <= circleCount; i++) {
        const radius = (i * circleSpacing + Math.sin(time * speed + i * 0.5) * 15) * scale;
        const opacity = Math.abs(Math.sin(time * 0.8 * speed + i * 0.3)) * (variant === 'loading' ? 0.4 : 0.3);
        
        ctx.strokeStyle = `${theme.colors.primary}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = variant === 'loading' ? 2 : 3;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      const lineCount = variant === 'loading' ? 8 : 12;
      for (let i = 0; i < lineCount; i++) {
        const angle = (i / lineCount) * Math.PI * 2 + time * 0.2 * speed;
        const length = (150 + Math.sin(time * 2 * speed + i) * 50) * scale;
        const opacity = Math.abs(Math.cos(time * speed + i * 0.2)) * (variant === 'loading' ? 0.5 : 0.4);
        
        const startX = centerX + Math.cos(angle) * 50 * scale;
        const startY = centerY + Math.sin(angle) * 50 * scale;
        const endX = centerX + Math.cos(angle) * length;
        const endY = centerY + Math.sin(angle) * length;
        
        ctx.strokeStyle = `${theme.colors.primary}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      const hexCount = variant === 'loading' ? 3 : 5;
      for (let layer = 0; layer < hexCount; layer++) {
        const hexRadius = (80 + layer * 60) * scale;
        const rotation = time * (0.1 + layer * 0.05) * speed * (layer % 2 === 0 ? 1 : -1);
        const opacity = Math.abs(Math.sin(time * 0.6 * speed + layer)) * 0.25;
        
        ctx.strokeStyle = `${theme.colors.primary}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for (let i = 0; i <= 6; i++) {
          const angle = (i / 6) * Math.PI * 2 + rotation;
          const x = centerX + Math.cos(angle) * hexRadius;
          const y = centerY + Math.sin(angle) * hexRadius;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      const orbitCount = variant === 'loading' ? 12 : 16;
      for (let i = 0; i < orbitCount; i++) {
        const orbitRadius = (120 + (i % 4) * 30) * scale;
        const angle = (i / orbitCount) * Math.PI * 2 + time * (0.3 + (i % 3) * 0.1) * speed;
        const x = centerX + Math.cos(angle) * orbitRadius;
        const y = centerY + Math.sin(angle) * orbitRadius;
        const size = (3 + Math.sin(time * 3 * speed + i) * 1.5) * scale;
        const opacity = Math.abs(Math.cos(time * 1.5 * speed + i * 0.4)) * 0.6;
        
        ctx.fillStyle = `${theme.colors.primary}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      if (showWords && words.length > 0) {
        const currentWord = words[wordIndexRef.current];
        const readingTime = calculateReadingTime(currentWord);
        const isFirstWord = wordIndexRef.current === 0;
        const isLastWord = wordIndexRef.current === words.length - 1;
        
        let yOffset = 0;
        if (wordTimeRef.current < readingTime * 0.15) {
          const progress = wordTimeRef.current / (readingTime * 0.15);
          wordOpacityRef.current = progress;
          
          if (isFirstWord) {
            yOffset = 50 * (1 - progress);
          }
        } else if (wordTimeRef.current < readingTime * 0.85) {
          wordOpacityRef.current = 1;
          yOffset = 0;
        } else {
          const progress = (wordTimeRef.current - readingTime * 0.85) / (readingTime * 0.15);
          wordOpacityRef.current = 1 - progress;
          
          if (isLastWord) {
            yOffset = 50 * progress;
          }
        }
        
        if (wordTimeRef.current >= readingTime) {
          wordIndexRef.current = (wordIndexRef.current + 1) % words.length;
          wordTimeRef.current = 0;
        }
        
        if (wordOpacityRef.current > 0) {
          ctx.font = variant === 'loading' ? 'bold 24px Poppins' : 'bold 28px Poppins';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          const wordOpacity = Math.floor(wordOpacityRef.current * 255).toString(16).padStart(2, '0');
          
          ctx.strokeStyle = `${theme.colors.surface}CC`;
          ctx.lineWidth = 3;
          ctx.fillStyle = `${theme.colors.primary}${wordOpacity}`;
          
          if (canvas.width < canvas.height / 2) {
            ctx.font = variant === 'loading' ? 'bold 18px Poppins' : 'bold 22px Poppins';
            const wordArray = currentWord.split(' ');
            const midPoint = Math.ceil(wordArray.length / 2);
            const firstLine = wordArray.slice(0, midPoint).join(' ');
            const secondLine = wordArray.slice(midPoint).join(' ');
            
            ctx.strokeText(firstLine, centerX, centerY - 20 + yOffset);
            ctx.fillText(firstLine, centerX, centerY - 20 + yOffset);
            if (secondLine) {
              ctx.strokeText(secondLine, centerX, centerY + 20 + yOffset);
              ctx.fillText(secondLine, centerX, centerY + 20 + yOffset);
            }
          } else {
            ctx.strokeText(currentWord, centerX, centerY + yOffset);
            ctx.fillText(currentWord, centerX, centerY + yOffset);
          }
        }
        
        wordTimeRef.current++;
      }

      timeRef.current += 1;
      animationFrameRef.current = requestAnimationFrame(drawGeometricPattern);
    };

    resizeCanvas();
    
    let resizeTimeout: NodeJS.Timeout;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
      }, 16);
    });
    
    resizeObserver.observe(canvas.parentElement || canvas);
    
    drawGeometricPattern();
    
    window.addEventListener('resize', resizeCanvas);

    return () => {
      clearTimeout(resizeTimeout);
      resizeObserver.disconnect();
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [theme, words, showWords, variant]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width,
        height,
        background: theme.colors.surface,
        borderRadius: '12px',
        ...style
      }}
    />
  );
};

export default DynamicCanvas;