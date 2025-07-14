import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context';

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps {
  options?: Option[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

interface OptionProps {
  children: React.ReactNode;
  value: string | number;
  key?: string;
}

interface SelectInterface extends React.FC<SelectProps> {
  Option: React.FC<OptionProps>;
}

export const Select: SelectInterface = ({
  options = [],
  value,
  onChange,
  placeholder = 'Selecione...',
  style,
  children
}) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // Extrair opções de children se fornecidas
  const childOptions: Option[] = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === Select.Option) {
      childOptions.push({
        label: child.props.children as string,
        value: child.props.value
      });
    }
  });

  const finalOptions = childOptions.length > 0 ? childOptions : options;
  const selectedOption = finalOptions.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} style={{ position: 'relative', ...style }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          height: '56px',
          padding: '16px',
          borderRadius: '12px',
          border: `1px solid ${theme.colors.border}`,
          backgroundColor: theme.colors.surface,
          color: theme.colors.text,
          fontSize: '16px',
          fontFamily: 'Poppins',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.3s ease'
        }}
      >
        <span style={{
          color: selectedOption ? theme.colors.text : theme.colors.textSecondary
        }}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span style={{
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease'
        }}>
          ▼
        </span>
      </div>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: theme.colors.surface,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: '12px',
          marginTop: '4px',
          zIndex: 1000,
          maxHeight: '200px',
          overflowY: 'auto',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}>
          {finalOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange?.(option.value);
                setIsOpen(false);
              }}
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                color: theme.colors.text,
                backgroundColor: value === option.value ? theme.colors.primary + '20' : 'transparent',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (value !== option.value) {
                  e.currentTarget.style.backgroundColor = theme.mode === 'light' ? '#f5f5f5' : '#333';
                }
              }}
              onMouseLeave={(e) => {
                if (value !== option.value) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Implementação do Select.Option
Select.Option = ({ children }) => {
  return null; // Este componente é apenas para API, não renderiza nada
};