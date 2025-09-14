# 🚀 NeuroDash Mock API

Mock API para desenvolvimento e testes da aplicação NeuroDash usando JSON Server.

## 📋 Endpoints Disponíveis

### Agentes
- `GET /api/agents` - Lista todos os agentes
- `GET /api/agents/:id` - Detalhes de um agente específico
- `GET /api/agents/:id/metrics` - Métricas de um agente específico
- `POST /api/agents/:id/chat` - Enviar mensagem para um agente
- `PUT /api/agents/:id/config` - Atualizar configuração de um agente

### Mensagens de Chat
- `GET /api/chatMessages` - Lista todas as mensagens
- `GET /api/chatMessages?agentId=:id` - Mensagens de um agente específico

### Métricas
- `GET /api/agentMetrics` - Lista todas as métricas
- `GET /api/agentMetrics?agentId=:id` - Métricas de um agente específico

## 🚀 Como Executar

### 1. Instalar dependências
```bash
cd mock-api
npm install
```

### 2. Executar o servidor
```bash
# Desenvolvimento (com auto-reload)
npm run dev

# Produção
npm start
```

O servidor estará disponível em: `http://localhost:3001`

## 📊 Dados de Exemplo

### Agentes
- **Assistant Bot** (conversational, online)
- **Data Analyzer** (analytical, busy)
- **Task Executor** (task-executor, offline)
- **Support Agent** (conversational, error)

### Funcionalidades Simuladas
- ✅ Delay de rede aleatório (100-600ms)
- ✅ Logs de requisições
- ✅ 5% de chance de erro simulado
- ✅ CORS habilitado
- ✅ Respostas automáticas de chat
- ✅ Atualização de configurações

## 🔧 Configuração

### Variáveis de Ambiente
- `PORT` - Porta do servidor (padrão: 3001)

### Estrutura de Dados
Ver `types.ts` para interfaces TypeScript completas.

## 📝 Exemplos de Uso

### Listar agentes
```bash
curl http://localhost:3001/api/agents
```

### Enviar mensagem
```bash
curl -X POST http://localhost:3001/api/agents/agent-1/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, how are you?"}'
```

### Atualizar configuração
```bash
curl -X PUT http://localhost:3001/api/agents/agent-1/config \
  -H "Content-Type: application/json" \
  -d '{"config": {"maxConcurrentTasks": 15, "timeout": 45000, "retryAttempts": 3, "priority": "high"}}'
```
