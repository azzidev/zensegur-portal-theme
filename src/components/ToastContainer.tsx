import React from 'react';
import { Toast, useToast } from './Toast';

export const ToastContainer: React.FC = () => {
  const toasts = useToast();

  return (
    <>
      {toasts.map((toast, index) => (
        <div key={toast.id} style={{ top: `${20 + index * 80}px` }}>
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => {}}
          />
        </div>
      ))}
    </>
  );
};