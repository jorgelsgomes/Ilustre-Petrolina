# Ilustre Petrolina

Site completo com galeria de imagens responsiva e sistema de administração.

## 🚀 Características

- **Galeria Responsiva**: Design moderno inspirado no Squarespace
- **Sistema de Login**: Autenticação segura para administradores
- **Upload de Imagens**: Interface para adicionar imagens com legendas
- **Design Elegante**: CSS moderno com gradientes e animações
- **Compatível com GitHub Pages**: Funciona sem backend

## 📁 Estrutura do Projeto

```
/
├── index.html          # Página principal com galeria
├── login.html          # Página de login
├── admin.html          # Painel de administração
├── images.json         # Dados das imagens (simulação de banco)
├── images/             # Pasta para imagens
│   ├── sample1.jpg
│   └── sample2.jpg
├── scripts/            # JavaScript
│   ├── main.js         # Script da galeria principal
│   ├── login.js        # Sistema de autenticação
│   └── admin.js        # Painel administrativo
└── styles/             # CSS
    └── style.css       # Estilos principais
```

## 🔐 Credenciais de Login

O sistema possui dois usuários válidos:

1. **Usuário**: `daiandreson` | **Senha**: `desenhista`
2. **Usuário**: `jorge` | **Senha**: `programador`

## 🎯 Funcionalidades

### Página Principal (index.html)
- Galeria de imagens em grid responsivo
- Carregamento automático das imagens do JSON
- Design moderno com hover effects
- Link para login de administrador
- **Visualização em Tela Cheia**: Clique na imagem para abrir em um modal fullscreen com legenda.

### Sistema de Login (login.html)
- Validação de credenciais
- Criação de sessão no localStorage
- Redirecionamento automático após login
- Mensagens de erro elegantes

### Painel Admin (admin.html)
- Proteção por sessão (só acessa após login)
- Upload de imagens com preview
- Adição de legendas
- Visualização das imagens atuais
- Botão de exclusão para cada imagem
- Logout seguro

## 🛠️ Como Usar

### Para Desenvolvimento Local

1. Clone ou baixe os arquivos
2. Inicie um servidor HTTP local:
   ```bash
   python3 -m http.server 8000
   ```
3. Acesse: `http://localhost:8000`

### Para GitHub Pages

1. Faça upload de todos os arquivos para um repositório
2. Ative o GitHub Pages nas configurações
3. O site estará disponível em: `https://seuusuario.github.io/seurepositorio`

## 💾 Armazenamento de Dados

Para compatibilidade com GitHub Pages (ambiente estático), o sistema usa:

- **localStorage**: Para sessões de usuário e imagens adicionadas
- **images.json**: Para imagens iniciais/exemplo
- **Base64**: Para armazenar imagens no navegador

> **Nota**: Em um ambiente real com backend, as imagens seriam enviadas para um servidor e salvas em banco de dados.

## 🎨 Design

O design foi inspirado no site Squarespace Montclaire, incluindo:

- Gradientes modernos no header
- Cards com sombras e hover effects
- Tipografia elegante
- Layout responsivo
- Animações suaves

## 📱 Responsividade

O site é totalmente responsivo e funciona em:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (até 767px)

## 🔧 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com Flexbox e Grid
- **JavaScript ES6+**: Funcionalidades interativas
- **LocalStorage**: Persistência de dados no cliente
- **FileReader API**: Upload e preview de imagens

## 📝 Licença

Este projeto foi criado para demonstração e pode ser usado livremente.

---

**Desenvolvido com ❤️ para Ilustre Petrolina**

