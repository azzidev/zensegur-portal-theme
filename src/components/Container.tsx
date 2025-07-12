import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: number | string;
  padding?: number | string;
  margin?: number | string;
  fluid?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 1200,
  padding = '0 16px',
  margin = '0 auto',
  fluid = false,
  style,
  className,
  ...props
}) => {
  return (
    <div
      className={className}
      style={{
        maxWidth: fluid ? '100%' : typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
        padding: typeof padding === 'number' ? `${padding}px` : padding,
        margin: typeof margin === 'number' ? `${margin}px` : margin,
        width: '100%',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};