import React, { useState } from 'react';
import { useTheme } from '../context';

interface DropdownProps {
  children: React.ReactNode;
  overlay: React.ReactNode;
  trigger?: 'hover' | 'click';
  placement?: 'bottom' | 'top';
}

export const Dropdown: React.FC<DropdownProps> = ({ 
  children, 
  overlay, 
  trigger = 'hover',
  placement = 'bottom'
}) => {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);

  const dropdownStyle: React.CSSProperties = {
    position: 'absolute',
    top: placement === 'bottom' ? '100%' : 'auto',
    bottom: placement === 'top' ? '100%' : 'auto',
    left: 0,
    zIndex: 1000,
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '6px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    minWidth: '120px',
    marginTop: placement === 'bottom' ? '4px' : '0',
    marginBottom: placement === 'top' ? '4px' : '0'
  };

  return (
    <div 
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => trigger === 'hover' && setVisible(true)}
      onMouseLeave={() => trigger === 'hover' && setVisible(false)}
      onClick={() => trigger === 'click' && setVisible(!visible)}
    >
      {children}
      {visible && (
        <div style={dropdownStyle}>
          {overlay}
        </div>
      )}
    </div>
  );
};