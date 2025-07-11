import React from 'react';
import { useTheme } from '../context';

interface SkeletonProps {
  active?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
  avatar?: boolean;
  paragraph?: { rows?: number };
  title?: boolean;
  style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  active = true,
  loading = true,
  children,
  avatar = false,
  paragraph = { rows: 3 },
  title = true,
  style 
}) => {
  const { theme } = useTheme();

  if (!loading && children) {
    return <>{children}</>;
  }

  const skeletonStyle: React.CSSProperties = {
    backgroundColor: theme.colors.border,
    borderRadius: '4px',
    animation: active ? 'skeleton-loading 1.4s ease-in-out infinite' : 'none',
    ...style
  };

  const keyframes = `
    @keyframes skeleton-loading {
      0% { opacity: 1; }
      50% { opacity: 0.4; }
      100% { opacity: 1; }
    }
  `;

  React.useEffect(() => {
    if (active) {
      const styleSheet = document.createElement('style');
      styleSheet.textContent = keyframes;
      document.head.appendChild(styleSheet);
      return () => {
        if (document.head.contains(styleSheet)) {
          document.head.removeChild(styleSheet);
        }
      };
    }
  }, [active]);

  return (
    <div style={{ display: 'flex', gap: '12px', ...style }}>
      {avatar && (
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            ...skeletonStyle
          }}
        />
      )}
      <div style={{ flex: 1 }}>
        {title && (
          <div
            style={{
              height: '16px',
              width: '60%',
              marginBottom: '8px',
              ...skeletonStyle
            }}
          />
        )}
        {Array.from({ length: paragraph.rows || 3 }).map((_, index) => (
          <div
            key={index}
            style={{
              height: '14px',
              width: index === (paragraph.rows || 3) - 1 ? '80%' : '100%',
              marginBottom: '8px',
              ...skeletonStyle
            }}
          />
        ))}
      </div>
    </div>
  );
};