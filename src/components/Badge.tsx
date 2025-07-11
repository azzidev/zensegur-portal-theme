import React from 'react';
import { useTheme } from '../context';

interface BadgeProps {
  count?: number;
  dot?: boolean;
  children?: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({ 
  count = 0, 
  dot = false, 
  children, 
  color,
  style 
}) => {
  const { theme } = useTheme();

  const badgeStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    ...style
  };

  const dotStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    right: 0,
    width: dot ? '6px' : 'auto',
    height: dot ? '6px' : '18px',
    backgroundColor: color || theme.colors.error,
    borderRadius: dot ? '50%' : '9px',
    color: 'white',
    fontSize: '11px',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: dot ? '6px' : '18px',
    padding: dot ? '0' : '0 6px',
    transform: 'translate(50%, -50%)',
    border: `1px solid ${theme.colors.background}`
  };

  const showBadge = dot || count > 0;

  return (
    <span style={badgeStyle}>
      {children}
      {showBadge && (
        <span style={dotStyle}>
          {!dot && count > 99 ? '99+' : !dot ? count : ''}
        </span>
      )}
    </span>
  );
};