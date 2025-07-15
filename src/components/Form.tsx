import React, { useRef } from 'react';
import { useTheme } from '../context';

export interface FormInstance {
  getFieldsValue: () => Record<string, any>;
  getFieldValue: (name: string) => any;
  setFieldsValue: (values: Record<string, any>) => void;
  resetFields: () => void;
  submit: () => void;
  validateFields: () => Promise<Record<string, any>>;
}

export function useForm(): [FormInstance] {
  const store = useRef<Record<string, any>>({});
  
  const form: FormInstance = {
    getFieldsValue: () => ({ ...store.current }),
    getFieldValue: (name) => store.current[name],
    setFieldsValue: (values) => {
      store.current = { ...store.current, ...values };
    },
    resetFields: () => {
      store.current = {};
    },
    submit: () => {},
    validateFields: async () => ({ ...store.current })
  };
  
  return [form];
}

const InternalForm: React.FC<{
  onFinish?: (values: any) => void;
  children: React.ReactNode;
  form?: FormInstance;
}> = ({ onFinish, children, form }) => {
  const formInstance = form || useForm()[0];
  
  formInstance.submit = () => {
    if (onFinish) {
      onFinish(formInstance.getFieldsValue());
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    formInstance.submit();
  };
  
  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      {children}
    </form>
  );
};

const InternalFormItem: React.FC<{
  label?: string;
  name?: string;
  rules?: Array<{ required?: boolean; message?: string }>;
  children: React.ReactNode;
}> = ({ label, name, rules, children }) => {
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

export const Form = InternalForm as typeof InternalForm & {
  Item: typeof InternalFormItem;
  useForm: typeof useForm;
};

Form.Item = InternalFormItem;
Form.useForm = useForm;