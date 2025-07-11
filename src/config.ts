import { ThemeConfig } from './types';
import { semanticColors } from './semantic-colors';

export const lightTheme: ThemeConfig = {
  mode: 'light',
  colors: {
    primary: '#E86412',
    background: '#F3F3F3',
    surface: '#FFFFFF',
    text: '#252525',
    textSecondary: '#A9A9A9',
    border: '#A9A9A9',
    error: semanticColors.light.error,
    success: semanticColors.light.success,
    warning: semanticColors.light.warning,
    info: semanticColors.light.info,
  },
};

export const darkTheme: ThemeConfig = {
  mode: 'dark',
  colors: {
    primary: '#E86412',
    background: '#211A12',
    surface: '#2A2017',
    text: '#F3F3F3',
    textSecondary: '#C9B691',
    border: '#C9B691',
    error: semanticColors.dark.error,
    success: semanticColors.dark.success,
    warning: semanticColors.dark.warning,
    info: semanticColors.dark.info,
  },
};

export const antdThemeConfig = {
  light: {
    algorithm: undefined,
    token: {
      colorPrimary: lightTheme.colors.primary,
      colorBgBase: lightTheme.colors.background,
      colorText: lightTheme.colors.text,
      colorTextSecondary: lightTheme.colors.textSecondary,
      colorBorder: lightTheme.colors.border,
      colorPrimaryBorder: '#B74C00',
      fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif',
    },
  },
  dark: {
    algorithm: 'dark',
    token: {
      colorPrimary: darkTheme.colors.primary,
      colorBgBase: darkTheme.colors.background,
      colorText: darkTheme.colors.text,
      colorTextSecondary: darkTheme.colors.textSecondary,
      colorBorder: darkTheme.colors.border,
      colorPrimaryBorder: '#664833',
      fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif',
    },
  },
};

export const zensegurThemeConfig = {
  light: {
    primary: '#E86412',
    background: '#F3F3F3',
    surface: '#FFFFFF',
    text: '#252525',
    textSecondary: '#A9A9A9',
    borderDefault: '#A9A9A9',
    borderActive: '#B74C00',
  },
  dark: {
    primary: '#E86412',
    background: '#211A12',
    surface: '#2A2017',
    text: '#F3F3F3',
    textSecondary: '#C9B691',
    borderDefault: '#C9B691',
    borderActive: '#664833',
  },
};