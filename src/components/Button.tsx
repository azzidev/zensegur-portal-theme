import React, { useState } from 'react';
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
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle: React.CSSProperties = {
    padding: '12px 24px',
    borderRadius: '20px',
    border: 'none',
    fontFamily: 'Poppins',
    fontWeight: 700,
    fontSize: '14px',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    transform: isHovered && !loading ? 'translateY(-1px)' : 'translateY(0)',
    boxShadow: isHovered && !loading ? '0 4px 8px rgba(0,0,0,0.1)' : 'none',
    ...style
  };

  const primaryStyle: React.CSSProperties = {
    ...baseStyle,
    backgroundColor: isHovered && !loading ? `${theme.colors.primary}dd` : theme.colors.primary,
    color: theme.colors.surface,
  };

  const secondaryStyle: React.CSSProperties = {
    ...baseStyle,
    backgroundColor: isHovered && !loading ? `${theme.colors.primary}10` : 'transparent',
    color: theme.colors.primary,
    border: `1px solid ${theme.colors.primary}`,
  };

  return (
    <button
      type={htmlType}
      style={type === 'primary' ? primaryStyle : secondaryStyle}
      onClick={onClick}
      disabled={loading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {loading ? 'Carregando...' : children}
    </button>
  );
};