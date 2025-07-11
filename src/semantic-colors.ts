import { ThemeMode } from './types';

// Cores semânticas baseadas na paleta Zensegur
export const semanticColors = {
  light: {
    // Estados de sucesso, aviso e erro baseados na paleta Zensegur
    success: '#4CAF50', // Verde mais suave que mantém acessibilidade
    warning: '#FF9800', // Laranja que combina com a paleta
    error: '#F44336',   // Vermelho padrão mantido
    info: '#E86412',    // Usa a cor primária da Zensegur
    
    // Estados de hover e interação
    hoverLight: '#F8F8F8', // Mais sutil que #f5f5f5
    hoverDark: '#E8E8E8',  // Para elementos que precisam de mais contraste
    
    // Transparências padronizadas
    overlay: 'rgba(0, 0, 0, 0.45)',
    backdrop: 'rgba(0, 0, 0, 0.25)',
  },
  dark: {
    success: '#52C41A', // Verde mais vibrante para modo escuro
    warning: '#FAAD14', // Amarelo mais vibrante para modo escuro
    error: '#FF4D4F',   // Vermelho mais vibrante para modo escuro
    info: '#E86412',    // Usa a cor primária da Zensegur
    
    // Estados de hover e interação
    hoverLight: '#3A2F1F', // Baseado na paleta escura da Zensegur
    hoverDark: '#4A3B28',  // Mais escuro para contraste
    
    // Transparências padronizadas
    overlay: 'rgba(0, 0, 0, 0.65)',
    backdrop: 'rgba(0, 0, 0, 0.45)',
  }
};

export const getSemanticColor = (mode: ThemeMode, colorKey: keyof typeof semanticColors.light) => {
  return semanticColors[mode][colorKey];
};