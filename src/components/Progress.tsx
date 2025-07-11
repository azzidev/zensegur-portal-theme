import React from 'react';
import { useTheme } from '../context';

interface ProgressProps {
  percent: number;
  type?: 'line' | 'circle';
  status?: 'normal' | 'success' | 'exception';
  showInfo?: boolean;
  strokeColor?: string;
  style?: React.CSSProperties;
}

export const Progress: React.FC<ProgressProps> = ({ 
  percent, 
  type = 'line',
  status = 'normal',
  showInfo = true,
  strokeColor,
  style 
}) => {
  const { theme } = useTheme();
  
  const getColor = () => {
    if (strokeColor) return strokeColor;
    if (status === 'success') return theme.colors.success;
    if (status === 'exception') return theme.colors.error;
    return theme.colors.primary;
  };

  if (type === 'circle') {
    const size = 120;
    const strokeWidth = 6;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percent / 100) * circumference;

    return (
      <div style={{ display: 'inline-block', ...style }}>
        <svg width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={theme.colors.border}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
          {showInfo && (
            <text
              x={size / 2}
              y={size / 2}
              textAnchor="middle"
              dy="0.3em"
              fontSize="24"
              fill={theme.colors.text}
            >
              {percent}%
            </text>
          )}
        </svg>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', ...style }}>
      <div style={{
        flex: 1,
        height: '8px',
        backgroundColor: theme.colors.border,
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <div
          style={{
            height: '100%',
            width: `${percent}%`,
            backgroundColor: getColor(),
            transition: 'width 0.3s ease'
          }}
        />
      </div>
      {showInfo && (
        <span style={{ 
          fontSize: '14px', 
          color: theme.colors.text,
          minWidth: '40px'
        }}>
          {percent}%
        </span>
      )}
    </div>
  );
};