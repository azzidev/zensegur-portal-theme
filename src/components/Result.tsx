import React from 'react';
import { useTheme } from '../context';

interface ResultProps {
  status: '403' | '404' | '500' | 'success' | 'error' | 'warning' | 'info';
  title: string;
  subTitle?: string;
  extra?: React.ReactNode;
}

export const Result: React.FC<ResultProps> = ({ status, title, subTitle, extra }) => {
  const { theme } = useTheme();

  const getStatusIcon = () => {
    switch (status) {
      case '403':
        return '🚫';
      case '404':
        return '🔍';
      case '500':
        return '💥';
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '❓';
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
        fontSize: '72px',
        marginBottom: '24px'
      }}>
        {getStatusIcon()}
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