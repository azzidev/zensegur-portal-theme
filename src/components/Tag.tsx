import React from 'react';
import { useTheme } from '../context';

interface TagProps {
  children: React.ReactNode;
  color?: string;
  closable?: boolean;
  onClose?: () => void;
  style?: React.CSSProperties;
}

export const Tag: React.FC<TagProps> = ({ 
  children, 
  color, 
  closable = false, 
  onClose,
  style 
}) => {
  const { theme } = useTheme();

  const tagStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 500,
    backgroundColor: color ? `${color}20` : theme.colors.border,
    color: color || theme.colors.text,
    border: `1px solid ${color ? `${color}40` : theme.colors.border}`,
    ...style
  };

  return (
    <span style={tagStyle}>
      {children}
      {closable && (
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'inherit',
            cursor: 'pointer',
            fontSize: '12px',
            padding: 0,
            marginLeft: '4px'
          }}
        >
          ×
        </button>
      )}
    </span>
  );
};