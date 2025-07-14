import React from 'react';
import { useTheme } from '../context';

interface DrawerProps {
  visible?: boolean;
  open?: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  width?: number | string;
  height?: number | string;
  footer?: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  visible,
  open,
  title,
  children,
  onClose,
  placement = 'right',
  width = 378,
  height = 378,
  footer
}) => {
  const { theme } = useTheme();

  // Suporta tanto visible quanto open para compatibilidade
  const isVisible = visible !== undefined ? visible : (open !== undefined ? open : false);
  if (!isVisible) return null;

  const getDrawerStyle = () => {
    const baseStyle = {
      position: 'fixed' as const,
      backgroundColor: theme.colors.surface,
      zIndex: 1000,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
      transition: 'transform 0.3s ease'
    };

    switch (placement) {
      case 'left':
        return {
          ...baseStyle,
          top: 0,
          left: 0,
          bottom: 0,
          width: typeof width === 'number' ? `${width}px` : width
        };
      case 'right':
        return {
          ...baseStyle,
          top: 0,
          right: 0,
          bottom: 0,
          width: typeof width === 'number' ? `${width}px` : width
        };
      case 'top':
        return {
          ...baseStyle,
          top: 0,
          left: 0,
          right: 0,
          height: typeof height === 'number' ? `${height}px` : height
        };
      case 'bottom':
        return {
          ...baseStyle,
          bottom: 0,
          left: 0,
          right: 0,
          height: typeof height === 'number' ? `${height}px` : height
        };
      default:
        return baseStyle;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999
        }}
      />
      
      {/* Drawer */}
      <div style={getDrawerStyle()}>
        {title && (
          <div style={{
            padding: '16px 20px',
            borderBottom: `1px solid ${theme.colors.border}`,
            fontWeight: 600,
            fontSize: '16px',
            color: theme.colors.text,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {title}
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
                color: theme.colors.textSecondary,
                padding: '4px'
              }}
            >
              ✕
            </button>
          </div>
        )}
        
        <div style={{
          padding: '20px',
          height: title ? (footer ? 'calc(100% - 120px)' : 'calc(100% - 60px)') : (footer ? 'calc(100% - 60px)' : '100%'),
          overflow: 'auto',
          color: theme.colors.text
        }}>
          {children}
        </div>
        
        {footer && (
          <div style={{
            padding: '16px 20px',
            borderTop: `1px solid ${theme.colors.border}`,
            color: theme.colors.text
          }}>
            {footer}
          </div>
        )}
      </div>
    </>
  );
};