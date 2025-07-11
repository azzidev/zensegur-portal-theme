import React from 'react';
import { useTheme } from '../context';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ children, title, style, bodyStyle }) => {
  const { theme } = useTheme();

  return (
    <div style={{
      backgroundColor: theme.colors.surface,
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      ...style
    }}>
      {title && (
        <div style={{
          padding: '16px 20px',
          borderBottom: `1px solid ${theme.colors.border}`,
          fontWeight: 600,
          fontSize: '16px',
          color: theme.colors.text
        }}>
          {title}
        </div>
      )}
      <div style={{
        padding: '20px',
        ...bodyStyle
      }}>
        {children}
      </div>
    </div>
  );
};