import { ThemeConfig } from './types';
import { semanticColors } from './semantic-colors';

export const lightTheme: ThemeConfig = {
  mode: 'light',
  colors: {
    primary: '#E86412',
    background: '#F3F3F3',
    surface: '#FFFFFF',
    text: '#252525',
    textSecondary: '#8A8A8A', // Mais escuro que #A9A9A9
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
    border: '#4A3B28', // Meio termo entre background e textSecondary
    error: semanticColors.dark.error,
    success: semanticColors.dark.success,
    warning: semanticColors.dark.warning,
    info: semanticColors.dark.info,
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