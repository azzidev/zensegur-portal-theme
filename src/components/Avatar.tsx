import React from 'react';
import { useTheme } from '../context';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number | 'small' | 'default' | 'large';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt, 
  size = 'default', 
  children, 
  style 
}) => {
  const { theme } = useTheme();
  
  const getSize = () => {
    if (typeof size === 'number') return size;
    const sizes = {
      small: 24,
      default: 32,
      large: 40
    };
    return sizes[size as keyof typeof sizes];
  };

  const avatarSize = getSize();
  const avatarStyle: React.CSSProperties = {
    width: avatarSize,
    height: avatarSize,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    color: 'white',
    fontSize: size === 'small' ? '12px' : size === 'large' ? '18px' : '14px',
    fontWeight: 500,
    overflow: 'hidden',
    ...style
  };

  if (src) {
    return (
      <img 
        src={src} 
        alt={alt} 
        style={avatarStyle}
      />
    );
  }

  return (
    <div style={avatarStyle}>
      {children}
    </div>
  );
};