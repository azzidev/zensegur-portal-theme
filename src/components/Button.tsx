import React from 'react';
import { useTheme } from '../context';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'primary' | 'secondary';
  loading?: boolean;
  htmlType?: 'button' | 'submit';
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  type = 'primary', 
  loading = false,
  htmlType = 'button',
  style 
}) => {
  const { theme } = useTheme();

  const baseStyle: React.CSSProperties = {
    padding: '12px 24px',
    borderRadius: '20px',
    border: 'none',
    fontFamily: 'Poppins',
    fontWeight: 700,
    fontSize: '14px',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    ...style
  };

  const primaryStyle: React.CSSProperties = {
    ...baseStyle,
    backgroundColor: theme.colors.primary,
    color: theme.colors.surface, // Usa a cor de surface que é branca no tema light
  };

  const secondaryStyle: React.CSSProperties = {
    ...baseStyle,
    backgroundColor: 'transparent',
    color: theme.colors.primary,
    border: `1px solid ${theme.colors.primary}`,
  };

  return (
    <button
      type={htmlType}
      style={type === 'primary' ? primaryStyle : secondaryStyle}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? 'Carregando...' : children}
    </button>
  );
};