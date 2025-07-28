import React, { useState } from 'react';
import { Input } from './Input';

interface InputMaskProps {
  mask: string;
  value?: string;
  onChange?: (valueView: string, valueOutput: string) => void;
  placeholder?: string;
  disabled?: boolean;
  prefix?: string;
}

const delimiters = ['.', '-', '/', '|', ';', ','];

export const InputMask: React.FC<InputMaskProps> = ({
  mask,
  value = '',
  onChange,
  placeholder,
  disabled = false,
  prefix = ''
}) => {
  const [displayValue, setDisplayValue] = useState('');

  const applyMask = (rawValue: string): string => {
    let masked = '';
    let rawIndex = 0;
    
    for (let i = 0; i < mask.length && rawIndex < rawValue.length; i++) {
      const maskChar = mask[i];
      const inputChar = rawValue[rawIndex];
      
      if (delimiters.indexOf(maskChar) !== -1) {
        masked += maskChar;
        continue;
      }
      
      if (maskChar === '0' && /\d/.test(inputChar)) {
        masked += inputChar;
        rawIndex++;
      } else if (maskChar === 'X' && /[a-zA-Z]/.test(inputChar)) {
        masked += inputChar;
        rawIndex++;
      } else if (maskChar === '0' || maskChar === 'X') {
        rawIndex++;
        i--;
      } else {
        if (maskChar === inputChar) {
          masked += inputChar;
          rawIndex++;
        } else {
          masked += maskChar;
        }
      }
    }
    
    return prefix + masked;
  };

  const removeMask = (maskedValue: string): string => {
    let raw = maskedValue;
    
    if (prefix && raw.indexOf(prefix) === 0) {
      raw = raw.substring(prefix.length);
    }
    
    delimiters.forEach(del => {
      raw = raw.split(del).join('');
    });
    
    return raw;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const rawValue = removeMask(newValue);
    const maskedValue = applyMask(rawValue);
    
    setDisplayValue(maskedValue);
    
    if (onChange) {
      onChange(maskedValue, rawValue);
    }
  };

  return (
    <Input
      value={displayValue}
      onChange={handleChange}
      placeholder={placeholder || mask}
      disabled={disabled}
    />
  );
};

export default InputMask;