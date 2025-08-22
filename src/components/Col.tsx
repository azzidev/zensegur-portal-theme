import React from 'react';

interface ColProps {
  children: React.ReactNode;
  span?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
  offset?: number;
  order?: number;
  flex?: string | number;
  style?: React.CSSProperties;
  className?: string;
}

export const Col: React.FC<ColProps> = ({
  children,
  span = 24,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  offset = 0,
  order,
  flex,
  style,
  className,
  ...props
}) => {
  const getResponsiveStyles = () => {
    const breakpoints = {
      xs: '(max-width: 575px)',
      sm: '(min-width: 576px)',
      md: '(min-width: 768px)',
      lg: '(min-width: 992px)',
      xl: '(min-width: 1200px)',
      xxl: '(min-width: 1600px)',
    };

    let styles = '';
    
    if (xs !== undefined) styles += `@media ${breakpoints.xs} { width: ${(xs / 24) * 100}% !important; }`;
    if (sm !== undefined) styles += `@media ${breakpoints.sm} { width: ${(sm / 24) * 100}% !important; }`;
    if (md !== undefined) styles += `@media ${breakpoints.md} { width: ${(md / 24) * 100}% !important; }`;
    if (lg !== undefined) styles += `@media ${breakpoints.lg} { width: ${(lg / 24) * 100}% !important; }`;
    if (xl !== undefined) styles += `@media ${breakpoints.xl} { width: ${(xl / 24) * 100}% !important; }`;
    if (xxl !== undefined) styles += `@media ${breakpoints.xxl} { width: ${(xxl / 24) * 100}% !important; }`;

    return styles;
  };

  const colStyles: React.CSSProperties = {
    position: 'relative',
    maxWidth: '100%',
    minHeight: '1px',
    width: flex ? 'auto' : `${(span / 24) * 100}%`,
    marginLeft: offset ? `${(offset / 24) * 100}%` : 0,
    order: order,
    flex: flex,
    ...style,
  };

  return (
    <>
      <style>{getResponsiveStyles()}</style>
      <div
        className={className}
        style={colStyles}
        {...props}
      >
        {children}
      </div>
    </>
  );
};