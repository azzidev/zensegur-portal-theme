import React from 'react';
import { useTheme } from '../context';

interface LinkProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'default' | 'primary' | 'secondary' | 'danger';
  underline?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({
  children,
  href,
  onClick,
  type = 'default',
  underline = true,
  disabled = false,
  style,
  className,
  ...props
}) => {
  const { theme } = useTheme();

  const getColor = () => {
    if (disabled) return theme.colors.textSecondary;
    switch (type) {
      case 'primary':
        return theme.colors.primary;
      case 'secondary':
        return theme.colors.textSecondary;
      case 'danger':
        return '#ff4d4f';
      default:
        return theme.colors.text;
    }
  };

  const linkStyle: React.CSSProperties = {
    color: getColor(),
    textDecoration: underline ? 'underline' : 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'color 0.2s ease',
    ...style,
  };

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  if (href && !disabled) {
    return (
      <a
        href={href}
        className={className}
        style={linkStyle}
        onClick={handleClick}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <span
      className={className}
      style={linkStyle}
      onClick={handleClick}
      {...props}
    >
      {children}
    </span>
  );
};