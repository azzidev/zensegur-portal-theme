import React from 'react';

interface SpaceProps {
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  size?: 'small' | 'middle' | 'large' | number;
  align?: 'start' | 'end' | 'center' | 'baseline';
  wrap?: boolean;
  split?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const Space: React.FC<SpaceProps> = ({
  children,
  direction = 'horizontal',
  size = 'small',
  align,
  wrap = false,
  split,
  style,
  className,
  ...props
}) => {
  const sizeMap = {
    small: 8,
    middle: 16,
    large: 24,
  };

  const gap = typeof size === 'number' ? size : sizeMap[size];
  const isVertical = direction === 'vertical';

  const alignMap = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    baseline: 'baseline',
  };

  const childrenArray = React.Children.toArray(children);

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: isVertical ? 'column' : 'row',
        alignItems: align ? alignMap[align] : undefined,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        gap: `${gap}px`,
        ...style,
      }}
      {...props}
    >
      {split
        ? childrenArray.map((child, index) => (
            <React.Fragment key={index}>
              {child}
              {index < childrenArray.length - 1 && (
                <span style={{ flexShrink: 0 }}>{split}</span>
              )}
            </React.Fragment>
          ))
        : children}
    </div>
  );
};