const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Middleware para adicionar CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Middleware para simular delay de rede
server.use((req, res, next) => {
  const delay = Math.random() * 500 + 100; // 100-600ms
  setTimeout(next, delay);
});

// Middleware para logs
server.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Middleware para simular erros ocasionais
server.use((req, res, next) => {
  if (Math.random() < 0.05) { // 5% chance de erro
    return res.status(500).json({ error: 'Internal Server Error' });
  }
  next();
});

// Middleware de simulação removido - agora usamos polling visual no frontend

// Middleware customizado para GET /api/agents/:id/chatMessages
server.get('/api/agents/:id/chatMessages', (req, res) => {
  const agentId = req.params.id;
  
  const db = router.db;
  const messages = db.get('chatMessages')
    .filter({ agentId })
    .value();
  
  res.json(messages);
});

// Middleware customizado para POST /api/agents/:id/chat
server.post('/api/agents/:id/chat', (req, res) => {
  const { message } = req.body;
  const agentId = req.params.id;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  
  // Simular resposta do agente
  const responses = [
    "I understand. Let me help you with that.",
    "That's an interesting question. Let me think about it.",
    "I can assist you with that. Here's what I suggest:",
    "Let me check that information for you.",
    "I'll need to gather some more details to help you properly."
  ];
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  const newMessage = {
    id: `msg-${Date.now()}`,
    agentId,
    message: randomResponse,
    sender: 'agent',
    timestamp: new Date().toISOString(),
    isTyping: false
  };
  
  // Adicionar mensagem ao banco de dados
  const db = router.db;
  db.get('chatMessages').push(newMessage).write();
  
  res.json(newMessage);
});

// Middleware customizado para PUT /api/agents/:id/config
server.put('/api/agents/:id/config', (req, res) => {
  const agentId = req.params.id;
  const { config } = req.body;
  
  if (!config) {
    return res.status(400).json({ error: 'Config is required' });
  }
  
  const db = router.db;
  const agent = db.get('agents').find({ id: agentId }).value();
  
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }
  
  // Atualizar configuração do agente
  db.get('agents')
    .find({ id: agentId })
    .assign({ config, lastActivity: new Date().toISOString() })
    .write();
  
  res.json({ ...agent, config, lastActivity: new Date().toISOString() });
});

server.use(middlewares);
server.use('/api', router);
server.use(router);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Mock API Server running on http://localhost:${PORT}`);
  console.log(`📊 Available endpoints:`);
  console.log(`   GET    /api/agents - Lista de agentes`);
  console.log(`   GET    /api/agents/:id - Detalhes do agente`);
  console.log(`   GET    /api/agents/:id/metrics - Métricas do agente`);
  console.log(`   GET    /api/agents/:id/chatMessages - Mensagens do chat`);
  console.log(`   POST   /api/agents/:id/chat - Enviar mensagem`);
  console.log(`   PUT    /api/agents/:id/config - Atualizar configuração`);
});
