import React, { useRef, useState, createContext, useContext, useEffect } from 'react';
import { useTheme } from '../context';

// Interface para a instância do formulário
export interface FormInstance {
  getFieldsValue: () => Record<string, any>;
  getFieldValue: (name: string) => any;
  setFieldsValue: (values: Record<string, any>) => void;
  resetFields: () => void;
  submit: () => void;
  validateFields: () => Promise<Record<string, any>>;
  registerField: (name: string, control: any) => void;
}

// Contexto do formulário
const FormContext = createContext<{
  form?: FormInstance;
  values: Record<string, any>;
  setFieldValue: (name: string, value: any) => void;
}>({
  values: {},
  setFieldValue: () => {}
});

// Hook useForm - cria uma instância de formulário
export function useForm(): [FormInstance] {
  const store = useRef<Record<string, any>>({});
  const fieldsRef = useRef<Record<string, any>>({});
  const formCallbacks = useRef<{
    onFinish?: (values: any) => void;
  }>({});
  
  const form: FormInstance = {
    getFieldsValue: () => ({ ...store.current }),
    getFieldValue: (name) => store.current[name],
    setFieldsValue: (values) => {
      store.current = { ...store.current, ...values };
      // Trigger re-render on fields
      Object.keys(values).forEach(name => {
        if (fieldsRef.current[name]) {
          fieldsRef.current[name].forceUpdate();
        }
      });
    },
    resetFields: () => {
      store.current = {};
      // Trigger re-render on all fields
      Object.keys(fieldsRef.current).forEach(name => {
        if (fieldsRef.current[name]) {
          fieldsRef.current[name].forceUpdate();
        }
      });
    },
    submit: () => {
      if (formCallbacks.current.onFinish) {
        formCallbacks.current.onFinish(store.current);
      }
    },
    validateFields: async () => {
      // Simple validation
      return { ...store.current };
    },
    registerField: (name, control) => {
      fieldsRef.current[name] = control;
    }
  };
  
  // Store form instance in ref to maintain identity
  const formRef = useRef(form);
  
  return [formRef.current];
}

// Hook para usar o contexto do formulário
const useFormContext = () => useContext(FormContext);

// Componente Form
const InternalForm: React.FC<{
  onFinish?: (values: any) => void;
  children: React.ReactNode;
  form?: FormInstance;
}> = ({ onFinish, children, form }) => {
  const [, forceUpdate] = useState({});
  const formInstance = form || useForm()[0];
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  
  // Store onFinish callback
  useEffect(() => {
    if (formInstance) {
      (formInstance as any).onFinish = onFinish;
    }
  }, [formInstance, onFinish]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onFinish) {
      onFinish(formInstance.getFieldsValue());
    }
  };
  
  const setFieldValue = (name: string, value: any) => {
    formInstance.setFieldsValue({ [name]: value });
    setFormValues(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <FormContext.Provider value={{ form: formInstance, values: formValues, setFieldValue }}>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

// Componente FormItem
const InternalFormItem: React.FC<{
  label?: string;
  name?: string;
  rules?: Array<{ required?: boolean; message?: string; type?: string }>;
  children: React.ReactNode;
}> = ({ label, name, rules, children }) => {
  const { theme } = useTheme();
  const { form, values, setFieldValue } = useFormContext();
  const [, forceUpdate] = useState({});
  
  // Register field with form
  useEffect(() => {
    if (form && name) {
      form.registerField(name, { forceUpdate: () => forceUpdate({}) });
    }
  }, [form, name]);
  
  // Get field value
  const value = name ? (form?.getFieldValue(name) || '') : '';
  
  // Handle input change
  const handleChange = (e: any) => {
    if (!name) return;
    
    const newValue = e && e.target ? e.target.value : e;
    setFieldValue(name, newValue);
  };
  
  // Clone children with props
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child) && name) {
      return React.cloneElement(child as React.ReactElement<any>, {
        value: value,
        onChange: handleChange,
      });
    }
    return child;
  });
  
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
        {childrenWithProps}
      </div>
    </div>
  );
};

// Exportar Form com Item e useForm
export const Form = InternalForm as React.FC<{
  onFinish?: (values: any) => void;
  children: React.ReactNode;
  form?: FormInstance;
}> & {
  Item: React.FC<{
    label?: string;
    name?: string;
    rules?: Array<{ required?: boolean; message?: string; type?: string }>;
    children: React.ReactNode;
  }>;
  useForm: typeof useForm;
};

Form.Item = InternalFormItem;
Form.useForm = useForm;