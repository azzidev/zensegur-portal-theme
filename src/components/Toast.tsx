import React, { useState, useEffect } from 'react';
import { useTheme } from '../context';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, duration = 3000, onClose }) => {
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getTypeColor = () => {
    switch (type) {
      case 'success': return theme.colors.success;
      case 'error': return theme.colors.error;
      case 'warning': return theme.colors.warning;
      case 'info': return theme.colors.info;
      default: return theme.colors.primary;
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: theme.colors.surface,
      color: theme.colors.text,
      padding: '16px 20px',
      borderRadius: '8px',
      borderLeft: `4px solid ${getTypeColor()}`,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      zIndex: 9999,
      maxWidth: '400px',
      fontFamily: 'Poppins',
      fontSize: '14px',
      animation: 'slideIn 0.3s ease-out'
    }}>
      {message}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// Hook para usar toast
let toastId = 0;
const toasts: Array<{ id: number; message: string; type: 'success' | 'error' | 'warning' | 'info' }> = [];
const listeners: Array<() => void> = [];

export const message = {
  success: (msg: string) => showToast(msg, 'success'),
  error: (msg: string) => showToast(msg, 'error'),
  warning: (msg: string) => showToast(msg, 'warning'),
  info: (msg: string) => showToast(msg, 'info'),
};

function showToast(msg: string, type: 'success' | 'error' | 'warning' | 'info') {
  const id = ++toastId;
  toasts.push({ id, message: msg, type });
  notifyListeners();
  
  setTimeout(() => {
    const index = toasts.findIndex(t => t.id === id);
    if (index > -1) {
      toasts.splice(index, 1);
      notifyListeners();
    }
  }, 3000);
}

function notifyListeners() {
  listeners.forEach(listener => listener());
}

export const useToast = () => {
  const [, forceUpdate] = useState({});
  
  useEffect(() => {
    const listener = () => forceUpdate({});
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  return toasts;
};