# ZenSegur Portal Theme

Sistema de temas unificado para microfrontends do ZenSegur Portal, fornecendo componentes React consistentes e sistema de cores padronizado.

## 🎨 Características

- **30+ Componentes React** prontos para uso
- **Sistema de cores semânticas** com suporte a tema claro/escuro
- **TypeScript** com tipagem completa
- **Compatível com Ant Design**
- **Persistência automática** do tema selecionado
- **Otimizado para microfrontends**

## 📦 Instalação

```bash
npm install zensegur-theme
```

## 🚀 Uso Rápido

### 1. Configurar o Provider

```tsx
import { ThemeProvider } from 'zensegur-theme';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

### 2. Usar Componentes

```tsx
import { Button, Card, Input, Alert } from 'zensegur-theme';

function MyComponent() {
  return (
    <Card title="Exemplo">
      <Alert message="Sucesso!" type="success" />
      <Input placeholder="Digite algo..." />
      <Button type="primary">Salvar</Button>
    </Card>
  );
}
```

### 3. Controlar Tema

```tsx
import { useTheme, ThemeToggle } from 'zensegur-theme';

function Header() {
  const { theme, mode, toggleTheme } = useTheme();
  
  return (
    <div>
      <span>Tema atual: {mode}</span>
      <ThemeToggle />
      <button onClick={toggleTheme}>Alternar Tema</button>
    </div>
  );
}
```

## 🎯 Componentes Disponíveis

### Layout & Estrutura

- `Container` - Container responsivo
- `Row` - Sistema de grid responsivo
- `Col` - Colunas com breakpoints (xs, sm, md, lg, xl, xxl)
- `Flex` - Layout flexível
- `Space` - Espaçamento consistente
- `Divider` - Separador visual
- `Card` - Cartão de conteúdo

### Formulários

- `Input` - Campo de entrada
- `InputMask` - Campo com máscara
- `Select` - Seleção dropdown
- `Checkbox` - Caixa de seleção
- `Switch` - Interruptor
- `Form` - Formulário estruturado

### Navegação & Interação

- `Button` - Botão de ação
- `Link` - Link navegável
- `Dropdown` - Menu suspenso
- `Tabs` - Abas de navegação
- `Modal` - Janela modal
- `Drawer` - Painel lateral

### Exibição de Dados

- `Table` - Tabela de dados
- `Tag` - Etiqueta/rótulo
- `Badge` - Distintivo numérico
- `Avatar` - Foto de perfil
- `Image` - Imagem com preview, carousel e loading
- `Typography` - Tipografia padronizada

### Feedback & Status

- `Alert` - Alertas e notificações
- `Toast` - Notificações temporárias
- `Progress` - Barra de progresso
- `Spin` - Indicador de carregamento
- `Skeleton` - Placeholder de carregamento
- `Result` - Página de resultado
- `Empty` - Estado vazio

### Utilitários

- `Collapse` - Conteúdo recolhível
- `DynamicCanvas` - Canvas dinâmico

## 🎨 Sistema de Cores

### Cores Semânticas

```tsx
// Cores principais
primary: '#E86412'     // Laranja ZenSegur
secondary: '#6B7280'   // Cinza neutro
success: '#10B981'     // Verde sucesso
warning: '#F59E0B'     // Amarelo aviso
error: '#EF4444'       // Vermelho erro
info: '#3B82F6'        // Azul informação

// Cores de fundo
background: '#FFFFFF'  // Fundo claro
surface: '#F9FAFB'     // Superfície clara
```

### Modo Escuro

```tsx
// Cores automáticas para modo escuro
background: '#1F2937'  // Fundo escuro
surface: '#374151'     // Superfície escura
text: '#F9FAFB'        // Texto claro
```

## ⚙️ Configuração Avançada

### Personalizar Tema

```tsx
import { ThemeProvider } from 'zensegur-theme';

const customTheme = {
  colors: {
    primary: '#YOUR_COLOR',
    secondary: '#YOUR_COLOR',
  }
};

<ThemeProvider theme={customTheme}>
  <App />
</ThemeProvider>
```

### Configurar Ant Design

```tsx
import { ConfigProvider } from 'antd';
import { useTheme } from 'zensegur-theme';

function AppWithAntd() {
  const { antdTheme } = useTheme();
  
  return (
    <ConfigProvider theme={antdTheme}>
      <YourAntdComponents />
    </ConfigProvider>
  );
}
```

## 🏗️ Arquitetura para Microfrontends

### Compartilhamento entre MFEs

1. **Instalar em cada MFE:**

```bash
npm install zensegur-theme
```

2. **Configurar no root de cada MFE:**

```tsx
import { ThemeProvider } from 'zensegur-theme';

// No MFE root
<ThemeProvider>
  <MicroFrontendApp />
</ThemeProvider>
```

3. **Sincronização automática:**
   O tema é sincronizado automaticamente via localStorage entre todos os MFEs.

### Benefícios

- ✅ **Consistência visual** entre todos os MFEs
- ✅ **Tema sincronizado** automaticamente
- ✅ **Bundle otimizado** - cada MFE importa apenas o que usa
- ✅ **TypeScript** com autocompletar
- ✅ **Atualizações centralizadas** via NPM

## 📚 Exemplos

### Grid Responsivo

```tsx
import { Row, Col, Card } from 'zensegur-theme';

function ResponsiveGrid() {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card title="Mobile: 100%">Conteúdo 1</Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card title="Tablet: 50%">Conteúdo 2</Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card title="Desktop: 33%">Conteúdo 3</Card>
      </Col>
    </Row>
  );
}
```

### Image com Preview e Carousel

```tsx
import { Image, Space } from 'zensegur-theme';

function ImageGallery() {
  const images = [
    '/img1.jpg',
    '/img2.jpg', 
    '/img3.jpg'
  ];

  return (
    <Space direction="vertical" size="large">
      <Image 
        src={images}
        preview={true}
        carousel={true}
        width={400}
        height={300}
      />
      <Image 
        src="/single-image.jpg"
        preview={true}
        width={200}
        height={150}
      />
    </Space>
  );
}
```

### Formulário Completo

```tsx
import { Form, Input, Button, Card, Alert, Space } from 'zensegur-theme';

function LoginForm() {
  return (
    <Card title="Login">
      <Form onSubmit={handleSubmit}>
        <Space direction="vertical" size="middle">
          <Input 
            placeholder="Email" 
            type="email" 
            required 
          />
          <Input 
            placeholder="Senha" 
            type="password" 
            required 
          />
          <Button type="primary" htmlType="submit">
            Entrar
          </Button>
        </Space>
      </Form>
    </Card>
  );
}
```

### Dashboard com Tema

```tsx
import { 
  Container, 
  Card, 
  Button, 
  useTheme,
  ThemeToggle 
} from 'zensegur-theme';

function Dashboard() {
  const { mode } = useTheme();
  
  return (
    <Container>
      <header>
        <h1>Dashboard - Modo {mode}</h1>
        <ThemeToggle />
      </header>
    
      <Card title="Estatísticas">
        <p>Conteúdo do dashboard...</p>
      </Card>
    </Container>
  );
}
```

## 📄 Licença

MIT © ZenSegur

## 🔗 Links

- [GitHub](https://github.com/azzidev/zensegur-portal-theme)
- [NPM](https://www.npmjs.com/package/zensegur-theme)
- [Documentação](https://azzidev.github.io/zensegur-portal-theme/)

---

**Versão:** 1.4.8
**Última atualização:** Agosto 2025
