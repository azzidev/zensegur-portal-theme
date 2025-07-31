import React from 'react';
import { useTheme } from '../context';

interface TypographyProps {
  children: React.ReactNode;
  bold?: boolean;
  italic?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export const Title: React.FC<TypographyProps> = ({ 
  children, 
  bold = false, 
  italic = false, 
  style, 
  className 
}) => {
  const { theme } = useTheme();
  
  return (
    <h1 
      className={className}
      style={{
        fontSize: '32px',
        fontWeight: bold ? 'bold' : '600',
        fontStyle: italic ? 'italic' : 'normal',
        color: theme.colors.text,
        margin: 0,
        ...style
      }}
    >
      {children}
    </h1>
  );
};

export const Label: React.FC<TypographyProps> = ({ 
  children, 
  bold = false, 
  italic = false, 
  style, 
  className 
}) => {
  const { theme } = useTheme();
  
  return (
    <label 
      className={className}
      style={{
        fontSize: '14px',
        fontWeight: bold ? 'bold' : '500',
        fontStyle: italic ? 'italic' : 'normal',
        color: theme.colors.text,
        margin: 0,
        ...style
      }}
    >
      {children}
    </label>
  );
};

export const Text: React.FC<TypographyProps> = ({ 
  children, 
  bold = false, 
  italic = false, 
  style, 
  className 
}) => {
  const { theme } = useTheme();
  
  return (
    <p 
      className={className}
      style={{
        fontSize: '16px',
        fontWeight: bold ? 'bold' : '400',
        fontStyle: italic ? 'italic' : 'normal',
        color: theme.colors.text,
        margin: 0,
        ...style
      }}
    >
      {children}
    </p>
  );
};