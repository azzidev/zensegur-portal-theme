import React from 'react';
import { useTheme } from '../context';

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'password';
  style?: React.CSSProperties;
}

export const Input: React.FC<InputProps> = ({ 
  placeholder, 
  value, 
  onChange, 
  type = 'text',
  style 
}) => {
  const { theme } = useTheme();

  const inputStyle: React.CSSProperties = {
    width: '100%',
    height: '56px',
    padding: '16px',
    borderRadius: '12px',
    border: `1px solid ${theme.colors.border}`,
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    fontSize: '16px',
    fontFamily: 'Poppins',
    outline: 'none',
    transition: 'all 0.3s ease',
    ...style
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={inputStyle}
      onFocus={(e) => {
        e.target.style.borderColor = theme.colors.primary;
        e.target.style.boxShadow = `0 0 0 2px rgba(232, 100, 18, 0.2)`;
      }}
      onBlur={(e) => {
        e.target.style.borderColor = theme.colors.border;
        e.target.style.boxShadow = 'none';
      }}
    />
  );
};