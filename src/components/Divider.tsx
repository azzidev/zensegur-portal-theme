import React from 'react';
import { useTheme } from '../context';

interface DividerProps {
  type?: 'horizontal' | 'vertical';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const Divider: React.FC<DividerProps> = ({ 
  type = 'horizontal', 
  children, 
  style 
}) => {
  const { theme } = useTheme();

  const dividerStyle: React.CSSProperties = {
    border: 'none',
    borderTop: type === 'horizontal' ? `1px solid ${theme.colors.border}` : 'none',
    borderLeft: type === 'vertical' ? `1px solid ${theme.colors.border}` : 'none',
    margin: type === 'horizontal' ? '16px 0' : '0 16px',
    height: type === 'vertical' ? '100%' : '1px',
    width: type === 'horizontal' ? '100%' : '1px',
    display: type === 'vertical' ? 'inline-block' : 'block',
    ...style
  };

  if (children) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        margin: '16px 0',
        ...style
      }}>
        <div style={{ flex: 1, height: '1px', backgroundColor: theme.colors.border }} />
        <span style={{ 
          padding: '0 16px', 
          color: theme.colors.textSecondary,
          fontSize: '14px'
        }}>
          {children}
        </span>
        <div style={{ flex: 1, height: '1px', backgroundColor: theme.colors.border }} />
      </div>
    );
  }

  return <hr style={dividerStyle} />;
};