import React from 'react';

interface RowProps {
  children: React.ReactNode;
  gutter?: number | [number, number];
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
  align?: 'top' | 'middle' | 'bottom' | 'stretch';
  wrap?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export const Row: React.FC<RowProps> = ({
  children,
  gutter = 0,
  justify = 'start',
  align = 'top',
  wrap = true,
  style,
  className,
  ...props
}) => {
  const gutterH = Array.isArray(gutter) ? gutter[0] : gutter;
  const gutterV = Array.isArray(gutter) ? gutter[1] : 0;

  const justifyMap = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    'space-around': 'space-around',
    'space-between': 'space-between',
    'space-evenly': 'space-evenly',
  };

  const alignMap = {
    top: 'flex-start',
    middle: 'center',
    bottom: 'flex-end',
    stretch: 'stretch',
  };

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexWrap: wrap ? 'wrap' : 'nowrap',
        justifyContent: justifyMap[justify],
        alignItems: alignMap[align],
        marginLeft: gutterH ? -gutterH / 2 : 0,
        marginRight: gutterH ? -gutterH / 2 : 0,
        rowGap: gutterV,
        ...style,
      }}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            style: {
              paddingLeft: gutterH ? gutterH / 2 : 0,
              paddingRight: gutterH ? gutterH / 2 : 0,
              ...child.props.style,
            },
          });
        }
        return child;
      })}
    </div>
  );
};