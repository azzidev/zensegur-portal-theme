import React, { useState } from 'react';
import { useTheme } from '../context';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  htmlType?: 'button' | 'submit';
  style?: React.CSSProperties;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  type = 'primary', 
  loading = false,
  htmlType = 'button',
  style,
  disabled = false
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
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    transform: isHovered && !loading && !disabled ? 'translateY(-1px)' : 'translateY(0)',
    boxShadow: isHovered && !loading && !disabled ? '0 4px 8px rgba(0,0,0,0.1)' : 'none',
    opacity: disabled ? 0.6 : 1,
    ...style
  };

  const getButtonStyle = () => {
    if (type === 'danger') {
      return {
        ...baseStyle,
        backgroundColor: isHovered && !loading && !disabled ? `${theme.colors.error}dd` : theme.colors.error,
        color: theme.colors.surface,
      };
    } else if (type === 'secondary') {
      return {
        ...baseStyle,
        backgroundColor: isHovered && !loading && !disabled ? `${theme.colors.primary}10` : 'transparent',
        color: theme.colors.primary,
        border: `1px solid ${theme.colors.primary}`,
      };
    } else {
      // primary
      return {
        ...baseStyle,
        backgroundColor: isHovered && !loading && !disabled ? `${theme.colors.primary}dd` : theme.colors.primary,
        color: theme.colors.surface,
      };
    }
  };

  return (
    <button
      type={htmlType}
      style={getButtonStyle()}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {loading ? 'Carregando...' : children}
    </button>
  );
};