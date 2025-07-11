import React from 'react';
import { useTheme } from '../context';

interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'small' | 'default';
  style?: React.CSSProperties;
}

export const Switch: React.FC<SwitchProps> = ({ 
  checked, 
  defaultChecked = false,
  onChange,
  disabled = false,
  size = 'default',
  style 
}) => {
  const { theme } = useTheme();
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  
  const isChecked = checked !== undefined ? checked : internalChecked;
  const isSmall = size === 'small';

  const switchStyle: React.CSSProperties = {
    width: isSmall ? '28px' : '44px',
    height: isSmall ? '16px' : '22px',
    backgroundColor: isChecked ? theme.colors.primary : theme.colors.border,
    borderRadius: isSmall ? '8px' : '11px',
    position: 'relative',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s',
    opacity: disabled ? 0.6 : 1,
    ...style
  };

  const handleStyle: React.CSSProperties = {
    width: isSmall ? '12px' : '18px',
    height: isSmall ? '12px' : '18px',
    backgroundColor: theme.colors.surface,
    borderRadius: '50%',
    position: 'absolute',
    top: '2px',
    left: isChecked ? (isSmall ? '14px' : '24px') : '2px',
    transition: 'all 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  };

  const handleClick = () => {
    if (disabled) return;
    const newChecked = !isChecked;
    if (checked === undefined) {
      setInternalChecked(newChecked);
    }
    onChange?.(newChecked);
  };

  return (
    <div style={switchStyle} onClick={handleClick}>
      <div style={handleStyle} />
    </div>
  );
};