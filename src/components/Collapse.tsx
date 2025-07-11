import React, { useState } from 'react';
import { useTheme } from '../context';

interface CollapseItemProps {
  key: string;
  header: React.ReactNode;
  children: React.ReactNode;
}

interface CollapseProps {
  items: CollapseItemProps[];
  defaultActiveKey?: string[];
  accordion?: boolean;
  onChange?: (activeKeys: string[]) => void;
  style?: React.CSSProperties;
}

export const Collapse: React.FC<CollapseProps> = ({ 
  items,
  defaultActiveKey = [],
  accordion = false,
  onChange,
  style 
}) => {
  const { theme } = useTheme();
  const [activeKeys, setActiveKeys] = useState<string[]>(defaultActiveKey);

  const handleToggle = (key: string) => {
    let newActiveKeys: string[];
    
    if (accordion) {
      newActiveKeys = activeKeys.indexOf(key) !== -1 ? [] : [key];
    } else {
      newActiveKeys = activeKeys.indexOf(key) !== -1
        ? activeKeys.filter(k => k !== key)
        : [...activeKeys, key];
    }
    
    setActiveKeys(newActiveKeys);
    onChange?.(newActiveKeys);
  };

  return (
    <div style={{
      border: `1px solid ${theme.colors.border}`,
      borderRadius: '6px',
      overflow: 'hidden',
      ...style
    }}>
      {items.map((item, index) => {
        const isActive = activeKeys.indexOf(item.key) !== -1;
        const isLast = index === items.length - 1;
        
        return (
          <div key={item.key}>
            <div
              style={{
                padding: '12px 16px',
                backgroundColor: theme.colors.surface,
                borderBottom: !isLast ? `1px solid ${theme.colors.border}` : 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'background-color 0.2s'
              }}
              onClick={() => handleToggle(item.key)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.colors.background;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = theme.colors.surface;
              }}
            >
              <div>{item.header}</div>
              <div style={{
                transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
                color: theme.colors.textSecondary,
                userSelect: 'none'
              }}>
                ▼
              </div>
            </div>
            {isActive && (
              <div style={{
                padding: '16px',
                backgroundColor: theme.colors.background,
                borderBottom: !isLast ? `1px solid ${theme.colors.border}` : 'none'
              }}>
                {item.children}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};