# Formulário RAG

Aplicação Next.js para enviar trechos e comentários de professora para processamento via API N8N webhook.

## 🚀 Tecnologias

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Docker** (para deploy em produção)

## 📋 Pré-requisitos

- Node.js 20+
- npm ou yarn
- Docker e Docker Compose (opcional, para produção)

## 🔧 Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
cp .env.example .env.local
```

Edite `.env.local` com suas credenciais:

### 2. Instalação

```bash
npm install
```

## 💻 Desenvolvimento

Execute o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## 🏗️ Build

Para criar um build de produção:

```bash
npm run build
npm start
```

## 🐳 Docker

### Desenvolvimento com Docker Compose

```bash
# Subir a aplicação
npm run docker:up

# Ver logs
npm run docker:logs

# Parar a aplicação
npm run docker:down
```

### Deploy em VPS (DigitalOcean)

#### 1. Build da Imagem

```bash
npm run docker:build
```

#### 2. Upload para VPS

No servidor VPS, clone o repositório e crie o arquivo `.env.local`:

```bash
git clone <seu-repositorio>
cd form-rag
```

Crie `.env.local` com as credenciais de produção:

```bash
nano .env.local
```

#### 3. Build e Deploy

```bash
# Build da imagem
docker build -t form-rag .

# Executar container
docker run -d \
  -p 3000:3000 \
  --env-file .env.local \
  --name form-rag \
  --restart unless-stopped \
  form-rag
```

Ou usando Docker Compose:

```bash
docker-compose up -d
```

#### 4. Configurar Reverse Proxy (Nginx)

Exemplo de configuração Nginx:

```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Para HTTPS com Certbot:

```bash
sudo certbot --nginx -d seu-dominio.com
```

## 📝 Uso

1. Acesse a aplicação no navegador
2. Preencha os campos:
   - **Trecho**: Digite o trecho de texto
   - **Comentário da Professora**: Digite o comentário
3. Clique em **Enviar**
4. A resposta da API será exibida abaixo do formulário

## 🔐 Segurança

- ✅ Token de API armazenado em variáveis de ambiente
- ✅ Server Actions do Next.js (execução no servidor)
- ✅ Validação de campos obrigatórios
- ✅ Tratamento de erros robusto

## 📦 Estrutura do Projeto

```
form-rag/
├── src/
│   ├── app/
│   │   ├── actions.ts           # Server Actions
│   │   ├── layout.tsx
│   │   └── page.tsx             # Página principal com formulário
│   └── components/
│       └── ResponseDisplay.tsx  # Componente de exibição de resposta
├── public/
├── .env.local                   # Variáveis de ambiente (não commitado)
├── .env.example                 # Template de variáveis
├── Dockerfile                   # Configuração Docker
├── docker-compose.yml           # Docker Compose
├── next.config.ts               # Configuração Next.js
└── package.json
```

## 🛠️ Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm start` - Iniciar servidor de produção
- `npm run lint` - Executar linter
- `npm run docker:build` - Build da imagem Docker
- `npm run docker:run` - Executar container Docker
- `npm run docker:up` - Subir com Docker Compose
- `npm run docker:down` - Parar Docker Compose
- `npm run docker:logs` - Ver logs do container

## 📄 Licença

Este projeto está sob a licença MIT.

