import React from 'react';
import { useTheme } from '../context';
import { Button } from './Button';

interface ModalProps {
  visible: boolean;
  title?: string;
  children: React.ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  width?: number;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  title,
  children,
  onOk,
  onCancel,
  okText = 'OK',
  cancelText = 'Cancelar',
  width = 520
}) => {
  const { theme } = useTheme();

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <div style={{
        backgroundColor: theme.colors.surface,
        borderRadius: '12px',
        width: `${width}px`,
        maxWidth: '90vw',
        maxHeight: '90vh',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        animation: 'slideUp 0.3s ease-out'
      }}>
        {title && (
          <div style={{
            padding: '16px 20px',
            borderBottom: `1px solid ${theme.colors.border}`,
            fontWeight: 600,
            fontSize: '16px',
            color: theme.colors.text
          }}>
            {title}
          </div>
        )}
        
        <div style={{
          padding: '20px',
          color: theme.colors.text
        }}>
          {children}
        </div>

        <div style={{
          padding: '12px 20px',
          borderTop: `1px solid ${theme.colors.border}`,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '8px'
        }}>
          {onCancel && (
            <Button type="secondary" onClick={onCancel}>
              {cancelText}
            </Button>
          )}
          {onOk && (
            <Button type="primary" onClick={onOk}>
              {okText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};