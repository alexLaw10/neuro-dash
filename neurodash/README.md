# NeuroDash

Plataforma com Micro Frontends (Angular) organizada em monorepo Nx, seguindo princípios de Arquitetura Hexagonal (Ports & Adapters) nas MFEs, com orquestração via Module Federation.

## Tecnologias
- Angular 16, RxJS 7, SCSS
- NX Monorepo e Module Federation
- json-server (Mock API)
- Cypress/Jest (setup)

## Projetos (apps)
- `mfe-shell`: container com layout/rotas, workbench com outlets `agents` e `chat` lado a lado
- `mfe-agents`: lista de agentes (grid), cálculo de métricas na UI
- `mfe-chat`: chat por agente, envio/recebimento simulado, integração por eventos

## Organização (Arquitetura Hexagonal nas MFEs)

### Estrutura por Camadas

Cada MFE (`mfe-agents`, `mfe-chat`) segue a arquitetura hexagonal com a seguinte organização:

#### 🏛️ **Domain Layer** (`core/domain/`)
- **Entidades**: modelos de negócio puros (ex: `Agent`, `Message`)
- **Enums**: constantes de domínio (ex: `AgentStatus`, `MessageType`)
- **Value Objects**: objetos imutáveis com lógica de negócio
- **Contratos**: interfaces de domínio (ex: `IAgentRepository`, `IMessageRepository`)
- **Regras de Negócio**: validações e cálculos específicos do domínio

#### ⚙️ **Application Layer** (`core/application/`)
- **Ports**: interfaces que definem contratos (ex: `IAgentService`, `IMessageService`)
- **Services**: implementações dos casos de uso e lógica de aplicação
- **Use Cases**: orquestração de operações complexas
- **DTOs**: objetos de transferência de dados
- **Adapters**: conversão entre DTOs e entidades de domínio

#### 🔌 **Infrastructure Layer** (`core/infrastructure/`)
- **Repositories**: implementações concretas dos ports de domínio
- **HTTP Clients**: comunicação com APIs externas
- **Storage**: persistência local (localStorage, IndexedDB)
- **DI Providers**: configuração de injeção de dependência
- **External Services**: integração com bibliotecas externas

#### 🎨 **Presentation Layer** (`core/presentation/`)
- **Components**: componentes Angular (UI)
- **Routes**: configuração de rotas
- **Styles**: SCSS e estilos específicos
- **Directives**: diretivas customizadas
- **Pipes**: transformadores de dados para apresentação

### Princípios Aplicados

#### 🔄 **Inversão de Dependência**
```typescript
// ❌ Ruim: Presentation conhece Infrastructure
constructor(private httpClient: HttpClient) {}

// ✅ Bom: Presentation depende apenas de Ports
constructor(private messageService: IMessageService) {}
```

#### 🏝️ **Isolamento do Domínio**
- Domain não possui dependências externas
- Zero imports de Angular ou bibliotecas externas
- Regras de negócio puras e testáveis

#### 🔌 **Ports & Adapters**
- **Ports**: interfaces que definem o que a aplicação precisa
- **Adapters**: implementações que conectam com o mundo externo
- **Flexibilidade**: trocar adapters sem afetar o domínio

#### 📦 **Injeção de Dependência**
```typescript
// providers.ts
export const providers = [
  { provide: IMessageService, useClass: MessageService },
  { provide: IMessageRepository, useClass: MessageRepository }
];
```

### Exemplo Prático (mfe-chat)

```
mfe-chat/src/app/core/
├── domain/
│   ├── entities/
│   │   ├── message.entity.ts      # Message(id, content, timestamp, agentId)
│   │   └── agent.entity.ts        # Agent(id, name, status)
│   ├── enums/
│   │   ├── message-type.enum.ts   # USER, AGENT, SYSTEM
│   │   └── agent-status.enum.ts   # ONLINE, OFFLINE, BUSY
│   └── contracts/
│       ├── message.repository.ts  # IMessageRepository
│       └── message.service.ts     # IMessageService
├── application/
│   ├── services/
│   │   ├── message.service.ts     # Implementa IMessageService
│   │   └── communication.service.ts # Comunicação entre MFEs
│   ├── ports/
│   │   └── message.port.ts        # Define contratos
│   └── adapters/
│       └── message.adapter.ts     # Conversão DTO ↔ Entity
├── infrastructure/
│   ├── repositories/
│   │   └── message.repository.ts  # Implementa IMessageRepository
│   └── providers/
│       └── di.providers.ts        # Configuração DI
└── presentation/
    ├── features/
    │   └── chat/
    │       ├── chat.component.ts  # UI Component
    │       ├── chat.component.html
    │       └── chat.component.scss
    └── shared/
        └── message-list/
            └── message-list.component.ts
```

### Benefícios da Arquitetura Hexagonal

1. **🧪 Testabilidade**: Domain e Application são facilmente testáveis
2. **🔄 Flexibilidade**: Trocar implementações sem afetar o domínio
3. **📈 Escalabilidade**: Adicionar novos adapters sem modificar o core
4. **🔧 Manutenibilidade**: Separação clara de responsabilidades
5. **🚀 Desenvolvimento**: Equipes podem trabalhar em camadas independentes

## Diagrama (Arquitetura Hexagonal por MFE)
```mermaid
flowchart TB
  subgraph "🎨 Presentation Layer"
    UI["Angular Components<br/>• ChatComponent<br/>• ListComponent<br/>• Directives & Pipes"]
  end
  
  subgraph "⚙️ Application Layer"
    APP["Services & Use Cases<br/>• MessageService<br/>• CommunicationService<br/>• DTOs & Adapters"]
    PORTS[("🔌 Ports<br/>• IMessageService<br/>• IAgentService<br/>• IMessageRepository")]
  end
  
  subgraph "🏛️ Domain Layer"
    DOM["Entities & Business Rules<br/>• Message Entity<br/>• Agent Entity<br/>• Enums & Value Objects"]
  end
  
  subgraph "🔌 Infrastructure Layer"
    ADP["Adapters & External Services<br/>• HTTP Repositories<br/>• Local Storage<br/>• DI Providers"]
  end

  UI -->|"Dependency Injection"| APP
  APP -->|"Implements"| PORTS
  ADP -->|"Implements"| PORTS
  APP -->|"Uses"| DOM
  UI -->|"Uses (Optional)"| DOM
  
  style UI fill:#e1f5fe
  style APP fill:#f3e5f5
  style DOM fill:#e8f5e8
  style ADP fill:#fff3e0
  style PORTS fill:#ffebee
```

## Arquitetura Geral (MFEs + Shell)
```mermaid
flowchart TB
  subgraph Shell
    ROUTER[Router + Workbench Outlets]
    SIDEBAR[Sidebar/Layout]
  end
  subgraph MFE-Agents
    LIST[ListComponent]
  end
  subgraph MFE-Chat
    CHAT[ChatComponent]
  end
  ROUTER -- Module Federation --> LIST
  ROUTER -- Module Federation --> CHAT
  CHAT -- CustomEvent(chat:messageSent) --> LIST
```

## Comunicação entre MFEs
- Evento global do `window` para sincronizar Chat → Lista (baixo acoplamento, sem imports cruzados):
  - `chat:messageSent` (detail: `{ agentId, status, lastActivity, sender, timestamp }`)
- `mfe-agents` escuta com `fromEvent(window, 'chat:messageSent')` e atualiza somente a linha do agente correspondente, executando em `NgZone` para refletir na UI.

## Polling e Atualizações de Estado
- Estado do agente (status/última atividade) e média de resposta são atualizados por eventos do chat (sem polling de rede).
- Cálculo de média de resposta na UI (simples e determinístico):
  - Armazena `lastUserMessageAtByAgent[agentId]` ao enviar mensagem
  - Ao receber resposta, calcula `deltaSeconds = (resposta - última mensagem do usuário)`
  - Mantém `sum` e `count` por agente e exibe `Math.round(sum/count)`

## Como rodar
```bash
npm install
npm run serve:all-with-mock
# abre: shell 4200, agents 4201, chat 4202, mock 3001
```

## Organização de pastas (resumo)
```
apps/
  mfe-shell/
  mfe-agents/
  mfe-chat/
mock-api/
```

## Decisões Importantes
- Evita import cross-MFE; contratos/eventos são consumidos via `window` (pode evoluir para `BroadcastChannel`)
- Enums/entidades locais por MFE para reduzir acoplamento (pode migrar tipos comuns para `libs/contracts`)
- Cálculo de métricas na apresentação (pode migrar para service de aplicação se necessário)

