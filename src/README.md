# Zensegur Theme System

Sistema de temas reutilizável para microfrontends do Zensegur Portal.

## Uso Básico

```tsx
import { ThemeProvider, useTheme, ThemeToggle } from './theme';

// No root da aplicação
<ThemeProvider>
  <App />
</ThemeProvider>

// Em qualquer componente
const { theme, mode, toggleTheme, setTheme } = useTheme();
```

## Compartilhamento entre Microfrontends

Para usar em outros microfrontends:

1. Copie a pasta `src/theme` para o novo projeto
2. Instale as dependências: `antd @ant-design/icons`
3. Importe e use o `ThemeProvider` no root
4. Use `useTheme()` em qualquer componente

## Personalização

Edite `config.ts` para personalizar cores e tokens do Ant Design.

## Persistência

O tema é automaticamente salvo no localStorage com a chave `zensegur-theme`.