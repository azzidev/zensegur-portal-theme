import React from 'react';
import { useTheme } from '../context';

interface FormProps {
  onFinish?: (values: any) => void;
  onFinishFailed?: (errorInfo: any) => void;
  layout?: 'horizontal' | 'vertical' | 'inline';
  children: React.ReactNode;
}

interface FormItemProps {
  label?: string;
  name?: string;
  rules?: Array<{
    required?: boolean;
    message?: string;
    type?: string;
    min?: number;
    max?: number;
    pattern?: RegExp;
  }>;
  children: React.ReactNode;
}

interface FormInstance {
  getFieldsValue: () => Record<string, any>;
  getFieldValue: (name: string) => any;
  setFieldsValue: (values: Record<string, any>) => void;
  resetFields: () => void;
  submit: () => void;
  validateFields: () => Promise<Record<string, any>>;
}

export const Form: React.FC<FormProps> & {
  Item: React.FC<FormItemProps>;
  useForm: () => [FormInstance];
} = ({ onFinish, onFinishFailed, layout = 'horizontal', children }) => {
  const { theme } = useTheme();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onFinish) {
      // In a real implementation, we would collect form values here
      onFinish({});
    }
  };
  
  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      {children}
    </form>
  );
};

Form.Item = ({ label, name, rules, children }) => {
  const { theme } = useTheme();
  
  return (
    <div style={{ marginBottom: '16px' }}>
      {label && (
        <div style={{ 
          marginBottom: '8px', 
          fontWeight: 500,
          color: theme.colors.text
        }}>
          {label}
          {rules?.some(rule => rule.required) && (
            <span style={{ color: theme.colors.error, marginLeft: '4px' }}>*</span>
          )}
        </div>
      )}
      <div>
        {children}
      </div>
    </div>
  );
};

Form.useForm = () => {
  const formInstance: FormInstance = {
    getFieldsValue: () => ({}),
    getFieldValue: (name: string) => undefined,
    setFieldsValue: (values: Record<string, any>) => {},
    resetFields: () => {},
    submit: () => {},
    validateFields: async () => ({})
  };
  
  return [formInstance];
};

export default Form;