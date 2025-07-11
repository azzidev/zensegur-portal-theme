import React from 'react';
import { useTheme } from '../context';

interface SpinProps {
  spinning?: boolean;
  children?: React.ReactNode;
  size?: 'small' | 'default' | 'large';
}

export const Spin: React.FC<SpinProps> = ({
  spinning = true,
  children,
  size = 'default'
}) => {
  const { theme } = useTheme();

  const getSizeValue = () => {
    switch (size) {
      case 'small': return 16;
      case 'large': return 32;
      default: return 24;
    }
  };

  const spinnerSize = getSizeValue();

  const spinner = (
    <div style={{
      display: 'inline-block',
      width: `${spinnerSize}px`,
      height: `${spinnerSize}px`,
      border: `2px solid ${theme.colors.border}`,
      borderTop: `2px solid ${theme.colors.primary}`,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  if (!children) {
    return spinner;
  }

  return (
    <div style={{ position: 'relative' }}>
      {children}
      {spinning && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10
        }}>
          {spinner}
        </div>
      )}
    </div>
  );
};