import React from 'react';
import { useTheme } from '../context';

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  children,
  disabled = false
}) => {
  const { theme } = useTheme();

  return (
    <label style={{
      display: 'flex',
      alignItems: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      fontFamily: 'Poppins',
      fontSize: '14px',
      color: theme.colors.text
    }}>
      <div style={{
        position: 'relative',
        width: '18px',
        height: '18px',
        marginRight: '8px'
      }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          style={{
            position: 'absolute',
            opacity: 0,
            width: '100%',
            height: '100%',
            cursor: disabled ? 'not-allowed' : 'pointer'
          }}
        />
        <div style={{
          width: '18px',
          height: '18px',
          border: `2px solid ${checked ? theme.colors.primary : theme.colors.border}`,
          borderRadius: '4px',
          backgroundColor: checked ? theme.colors.primary : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease'
        }}>
          {checked && (
            <span style={{
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              ✓
            </span>
          )}
        </div>
      </div>
      {children}
    </label>
  );
};