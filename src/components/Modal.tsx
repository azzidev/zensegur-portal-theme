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

interface ConfirmOptions {
  title: string;
  content?: React.ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  okType?: 'primary' | 'danger';
}

interface ModalInterface extends React.FC<ModalProps> {
  confirm: (options: ConfirmOptions) => void;
}

export const Modal: ModalInterface = ({
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

// Implementação do método confirm
Modal.confirm = (options: ConfirmOptions) => {
  const modalRoot = document.createElement('div');
  document.body.appendChild(modalRoot);

  const handleOk = () => {
    if (options.onOk) options.onOk();
    document.body.removeChild(modalRoot);
  };

  const handleCancel = () => {
    if (options.onCancel) options.onCancel();
    document.body.removeChild(modalRoot);
  };

  // Renderizar o modal de confirmação
  const modalElement = document.createElement('div');
  modalRoot.appendChild(modalElement);

  // Criar um elemento de estilo para o modal
  const style = document.createElement('style');
  style.innerHTML = `
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .modal-content {
      background-color: white;
      border-radius: 12px;
      width: 400px;
      max-width: 90vw;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }
    .modal-header {
      padding: 16px 20px;
      border-bottom: 1px solid #eee;
      font-weight: 600;
      font-size: 16px;
    }
    .modal-body {
      padding: 20px;
    }
    .modal-footer {
      padding: 12px 20px;
      border-top: 1px solid #eee;
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
    .btn {
      padding: 8px 16px;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      font-weight: 500;
    }
    .btn-primary {
      background-color: #1890ff;
      color: white;
    }
    .btn-danger {
      background-color: #ff4d4f;
      color: white;
    }
    .btn-default {
      background-color: #f0f0f0;
      border: 1px solid #d9d9d9;
    }
  `;
  document.head.appendChild(style);

  // Criar o HTML do modal
  modalElement.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">${options.title}</div>
        <div class="modal-body">${options.content || ''}</div>
        <div class="modal-footer">
          <button id="cancel-btn" class="btn btn-default">${options.cancelText || 'Cancelar'}</button>
          <button id="ok-btn" class="btn ${options.okType === 'danger' ? 'btn-danger' : 'btn-primary'}">${options.okText || 'OK'}</button>
        </div>
      </div>
    </div>
  `;

  // Adicionar event listeners
  document.getElementById('ok-btn')?.addEventListener('click', handleOk);
  document.getElementById('cancel-btn')?.addEventListener('click', handleCancel);
};