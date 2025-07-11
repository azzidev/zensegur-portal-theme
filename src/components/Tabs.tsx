import React, { useState } from 'react';
import { useTheme } from '../context';

interface TabPane {
  key: string;
  tab: string;
  children: React.ReactNode;
}

interface TabsProps {
  defaultActiveKey?: string;
  activeKey?: string;
  onChange?: (key: string) => void;
  children: React.ReactElement<TabPaneProps>[] | React.ReactElement<TabPaneProps>;
}

export const Tabs: React.FC<TabsProps> = ({
  defaultActiveKey,
  activeKey,
  onChange,
  children
}) => {
  const { theme } = useTheme();
  const [internalActiveKey, setInternalActiveKey] = useState(defaultActiveKey || '');
  
  const currentActiveKey = activeKey !== undefined ? activeKey : internalActiveKey;
  const childrenArray = Array.isArray(children) ? children : [children];
  
  const handleTabClick = (key: string) => {
    if (activeKey === undefined) {
      setInternalActiveKey(key);
    }
    onChange?.(key);
  };

  const activePane = childrenArray.find(child => child.props.tabKey === currentActiveKey);

  return (
    <div>
      <div style={{
        borderBottom: `1px solid ${theme.colors.border}`,
        marginBottom: '20px'
      }}>
        <div style={{
          display: 'flex',
          gap: '0'
        }}>
          {childrenArray.map((child: any) => (
            <button
              key={child.props.tabKey}
              onClick={() => handleTabClick(child.props.tabKey)}
              style={{
                padding: '12px 20px',
                border: 'none',
                backgroundColor: 'transparent',
                color: currentActiveKey === child.props.tabKey ? theme.colors.primary : theme.colors.textSecondary,
                fontFamily: 'Poppins',
                fontSize: '14px',
                fontWeight: currentActiveKey === child.props.tabKey ? 600 : 400,
                cursor: 'pointer',
                borderBottom: currentActiveKey === child.props.tabKey ? `2px solid ${theme.colors.primary}` : '2px solid transparent',
                transition: 'all 0.3s ease'
              }}
            >
              {child.props.tab}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        {activePane?.props.children}
      </div>
    </div>
  );
};

interface TabPaneProps {
  tabKey: string;
  tab: string;
  children: React.ReactNode;
}

export const TabPane: React.FC<TabPaneProps> = ({ children }) => {
  return <>{children}</>;
};