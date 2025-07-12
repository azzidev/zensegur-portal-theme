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

  // Ícone deve ser sempre passado explicitamente

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
      {icon && (
        <div style={{
          marginBottom: '24px'
        }}>
          {icon}
        </div>
      )}
      
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