import React from 'react';
import { useTheme } from '../context';

interface ResultProps {
  status: '403' | '404' | '500' | 'success' | 'error' | 'warning' | 'info';
  title: string;
  subTitle?: string;
  extra?: React.ReactNode;
  icon?: React.ReactNode;
}

export const Result: React.FC<ResultProps> = ({ status, title, subTitle, extra, icon }) => {
  const { theme } = useTheme();

  const getDefaultIcon = () => {
    if (icon) return icon;
    
    // Fallback simples sem dependência de biblioteca
    const iconStyle = {
      fontSize: '72px',
      opacity: 0.6
    };
    
    switch (status) {
      case '403':
      case 'error':
        return <div style={{...iconStyle, color: '#ff4d4f'}}>✕</div>;
      case '404':
        return <div style={{...iconStyle, color: theme.colors.textSecondary}}>?</div>;
      case '500':
        return <div style={{...iconStyle, color: '#ff4d4f'}}>!</div>;
      case 'success':
        return <div style={{...iconStyle, color: '#52c41a'}}>✓</div>;
      case 'warning':
        return <div style={{...iconStyle, color: '#faad14'}}>⚠</div>;
      case 'info':
        return <div style={{...iconStyle, color: '#1890ff'}}>i</div>;
      default:
        return <div style={{...iconStyle, color: theme.colors.textSecondary}}>?</div>;
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      textAlign: 'center',
      minHeight: '400px'
    }}>
      <div style={{
        marginBottom: '24px'
      }}>
        {getDefaultIcon()}
      </div>
      
      <h1 style={{
        fontSize: '24px',
        fontWeight: 600,
        color: theme.colors.text,
        margin: '0 0 8px 0'
      }}>
        {title}
      </h1>
      
      {subTitle && (
        <p style={{
          fontSize: '14px',
          color: theme.colors.textSecondary,
          margin: '0 0 24px 0',
          maxWidth: '400px'
        }}>
          {subTitle}
        </p>
      )}
      
      {extra && (
        <div>
          {extra}
        </div>
      )}
    </div>
  );
};