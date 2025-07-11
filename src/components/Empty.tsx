import React from 'react';
import { useTheme } from '../context';

interface EmptyProps {
  description?: string;
  image?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const Empty: React.FC<EmptyProps> = ({ 
  description = 'Nenhum dado',
  image,
  children,
  style 
}) => {
  const { theme } = useTheme();

  const defaultImage = (
    <svg width="64" height="41" viewBox="0 0 64 41" fill="none">
      <g opacity="0.25">
        <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.258L9 12.76V22h46v-9.24z" fill={theme.colors.border}/>
        <path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill={theme.colors.border}/>
      </g>
    </svg>
  );

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 16px',
      textAlign: 'center',
      ...style
    }}>
      <div style={{ marginBottom: '16px' }}>
        {image || defaultImage}
      </div>
      <div style={{
        color: theme.colors.textSecondary,
        fontSize: '14px',
        marginBottom: children ? '16px' : 0
      }}>
        {description}
      </div>
      {children}
    </div>
  );
};