import React, { useState, useEffect } from 'react';
import { Input } from './Input';

interface MaskRule {
  mask: string;
  to: string;
}

interface InputMaskProps {
  mask: string;
  value?: string;
  onChange?: (value: string, rawValue: string) => void;
  delimiter?: string[];
  maskRules?: MaskRule[];
  prefix?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const defaultDelimiters = [',', '.', '/', '|', ';', '-', ' ', '(', ')'];
const defaultMaskRules: MaskRule[] = [
  { mask: 'X', to: 'letter' }, // Qualquer letra, exclui números
  { mask: '0', to: 'number' }  // Qualquer número, exclui letras
];

export const InputMask: React.FC<InputMaskProps> = ({
  mask,
  value = '',
  onChange,
  delimiter = defaultDelimiters,
  maskRules = defaultMaskRules,
  prefix = '',
  placeholder,
  disabled = false,
  className
}) => {
  const [displayValue, setDisplayValue] = useState('');

  // Aplica máscara ao valor
  const applyMask = (rawValue: string): string => {
    let maskedValue = '';
    let rawIndex = 0;
    
    for (let i = 0; i < mask.length && rawIndex < rawValue.length; i++) {
      const maskChar = mask[i];
      const inputChar = rawValue[rawIndex];
      
      // Se é um delimitador na máscara, adiciona diretamente
      if (delimiter.indexOf(maskChar) !== -1) {
        maskedValue += maskChar;
        continue;
      }
      
      // Encontra a regra para este caractere da máscara
      const rule = maskRules.find(r => r.mask === maskChar);
      
      if (rule) {
        if (rule.to === 'number' && /\d/.test(inputChar)) {
          maskedValue += inputChar;
          rawIndex++;
        } else if (rule.to === 'letter' && /[a-zA-Z]/.test(inputChar)) {
          maskedValue += inputChar;
          rawIndex++;
        } else {
          // Caractere não corresponde à regra, pula
          rawIndex++;
          i--; // Tenta novamente com o mesmo caractere da máscara
        }
      } else {
        // Caractere literal na máscara
        if (maskChar === inputChar) {
          maskedValue += inputChar;
          rawIndex++;
        } else {
          maskedValue += maskChar;
        }
      }
    }
    
    return prefix + maskedValue;
  };

  // Remove máscara do valor
  const removeMask = (maskedValue: string): string => {
    let rawValue = maskedValue;
    
    // Remove prefix
    if (prefix && rawValue.indexOf(prefix) === 0) {
      rawValue = rawValue.substring(prefix.length);
    }
    
    // Remove delimitadores
    delimiter.forEach(del => {
      rawValue = rawValue.replace(new RegExp(`\\${del}`, 'g'), '');
    });
    
    return rawValue;
  };

  // Atualiza display value quando value prop muda
  useEffect(() => {
    if (value) {
      const masked = applyMask(removeMask(value));
      setDisplayValue(masked);
    } else {
      setDisplayValue(prefix);
    }
  }, [value, mask, prefix]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Remove caracteres que não são permitidos
    const rawValue = removeMask(newValue);
    const maskedValue = applyMask(rawValue);
    
    setDisplayValue(maskedValue);
    
    if (onChange) {
      onChange(maskedValue, rawValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Permite navegação e edição
    const allowedKeys = [
      'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      'Home', 'End'
    ];
    
    if (allowedKeys.indexOf(e.key) !== -1) {
      return;
    }
    
    // Permite Ctrl+A, Ctrl+C, Ctrl+V, etc.
    if (e.ctrlKey || e.metaKey) {
      return;
    }
    
    // Verifica se o caractere é válido para a posição atual
    const currentPos = (e.target as HTMLInputElement).selectionStart || 0;
    const maskPos = currentPos - prefix.length;
    
    if (maskPos >= 0 && maskPos < mask.length) {
      const maskChar = mask[maskPos];
      const rule = maskRules.find(r => r.mask === maskChar);
      
      if (rule) {
        if (rule.to === 'number' && !/\d/.test(e.key)) {
          e.preventDefault();
        } else if (rule.to === 'letter' && !/[a-zA-Z]/.test(e.key)) {
          e.preventDefault();
        }
      }
    }
  };

  return (
    <Input
      value={displayValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder || mask}
      disabled={disabled}
      className={className}
    />
  );
};

export default InputMask;