import React from 'react';
import { useTheme } from '../context';

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  type?: 'text' | 'password';
  style?: React.CSSProperties;
  disabled?: boolean;
  className?: string;
}

interface InputInterface extends React.FC<InputProps> {
  Password: React.FC<InputProps>;
}

export const Input: InputInterface = ({ 
  placeholder, 
  value, 
  onChange,
  onKeyDown,
  type = 'text',
  style,
  disabled = false,
  className
}) => {
  const { theme } = useTheme();

  const inputStyle: React.CSSProperties = {
    width: '100%',
    height: '14px',
    padding: '16px',
    borderRadius: '12px',
    border: `1px solid ${theme.colors.border}`,
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    fontSize: '16px',
    fontFamily: 'Poppins',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    ...style
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      disabled={disabled}
      className={className}
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

// Implementação do Input.Password
Input.Password = ({ 
  placeholder, 
  value, 
  onChange, 
  style 
}) => {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div style={{ position: 'relative', width: '100%', display: 'inline-block' }}>
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          ...style,
          width: '100%',
          height: '14px',
          padding: '16px',
          paddingRight: '40px',
          borderRadius: '12px',
          border: `1px solid ${theme.colors.border}`,
          backgroundColor: theme.colors.surface,
          color: theme.colors.text,
          fontSize: '16px',
          fontFamily: 'Poppins',
          outline: 'none',
          transition: 'all 0.3s ease',
          boxSizing: 'border-box'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = theme.colors.primary;
          e.target.style.boxShadow = `0 0 0 2px rgba(232, 100, 18, 0.2)`;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = theme.colors.border;
          e.target.style.boxShadow = 'none';
        }}
      />
      <span 
        style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
          color: theme.colors.textSecondary,
          fontSize: '18px'
        }} 
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? '👁️' : '👁️‍🗨️'}
      </span>
    </div>
  );
};