const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api';

async function testApi() {
  console.log('🧪 Testando Mock API...\n');

  try {
    // Teste 1: Listar agentes
    console.log('1. Testando GET /api/agents');
    const agentsResponse = await axios.get(`${BASE_URL}/agents`);
    console.log(`✅ Sucesso: ${agentsResponse.data.length} agentes encontrados`);
    console.log(`   Primeiro agente: ${agentsResponse.data[0].name} (${agentsResponse.data[0].status})\n`);

    // Teste 2: Buscar agente específico
    console.log('2. Testando GET /api/agents/agent-1');
    const agentResponse = await axios.get(`${BASE_URL}/agents/agent-1`);
    console.log(`✅ Sucesso: Agente encontrado - ${agentResponse.data.name}\n`);

    // Teste 3: Buscar métricas do agente
    console.log('3. Testando GET /api/agents/agent-1/metrics');
    const metricsResponse = await axios.get(`${BASE_URL}/agents/agent-1/metrics`);
    console.log(`✅ Sucesso: Métricas encontradas - Uptime: ${metricsResponse.data[0].uptime}%\n`);

    // Teste 4: Enviar mensagem
    console.log('4. Testando POST /api/agents/agent-1/chat');
    const chatResponse = await axios.post(`${BASE_URL}/agents/agent-1/chat`, {
      message: 'Hello, how are you?'
    });
    console.log(`✅ Sucesso: Mensagem enviada - ${chatResponse.data.message}\n`);

    // Teste 5: Atualizar configuração
    console.log('5. Testando PUT /api/agents/agent-1/config');
    const configResponse = await axios.put(`${BASE_URL}/agents/agent-1/config`, {
      config: {
        maxConcurrentTasks: 15,
        timeout: 45000,
        retryAttempts: 3,
        priority: 'high'
      }
    });
    console.log(`✅ Sucesso: Configuração atualizada - Max Tasks: ${configResponse.data.config.maxConcurrentTasks}\n`);

    console.log('🎉 Todos os testes passaram! Mock API está funcionando corretamente.');

  } catch (error) {
    console.error('❌ Erro no teste:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
  }
}

// Executar testes se o arquivo for chamado diretamente
if (require.main === module) {
  testApi();
}

module.exports = { testApi };
