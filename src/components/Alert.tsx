import React from 'react';
import { useTheme } from '../context';

interface AlertProps {
  type?: 'success' | 'info' | 'warning' | 'error';
  message: string;
  description?: string;
  closable?: boolean;
  onClose?: () => void;
  style?: React.CSSProperties;
}

export const Alert: React.FC<AlertProps> = ({ 
  type = 'info', 
  message, 
  description, 
  closable = false, 
  onClose,
  style 
}) => {
  const { theme } = useTheme();
  
  const colors = {
    success: theme.colors.success,
    info: theme.colors.info,
    warning: theme.colors.warning,
    error: theme.colors.error
  };

  const alertStyle: React.CSSProperties = {
    padding: '12px 16px',
    borderRadius: '6px',
    border: `1px solid ${colors[type]}20`,
    backgroundColor: `${colors[type]}10`,
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    ...style
  };

  return (
    <div style={alertStyle}>
      <div style={{ flex: 1 }}>
        <div style={{ 
          color: colors[type], 
          fontWeight: 500,
          marginBottom: description ? '4px' : 0
        }}>
          {message}
        </div>
        {description && (
          <div style={{ 
            color: theme.colors.textSecondary,
            fontSize: '14px'
          }}>
            {description}
          </div>
        )}
      </div>
      {closable && (
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: theme.colors.textSecondary,
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};