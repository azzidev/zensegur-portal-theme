import React, { createContext, useContext, useEffect, useState } from 'react';
import { ConfigProvider, theme } from 'antd';
import { ThemeContextType, ThemeMode } from './types';
import { lightTheme, darkTheme, antdThemeConfig } from './config';

const THEME_STORAGE_KEY = 'zensegur-theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return (saved as ThemeMode) || 'light';
  });

  const currentTheme = mode === 'light' ? lightTheme : darkTheme;

  const toggleTheme = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setTheme = (newMode: ThemeMode) => {
    setMode(newMode);
  };

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  const antdConfig = {
    algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: antdThemeConfig[mode].token,
  };

  return (
    <ThemeContext.Provider value={{
      theme: currentTheme,
      mode,
      toggleTheme,
      setTheme,
    }}>
      <ConfigProvider theme={antdConfig}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};