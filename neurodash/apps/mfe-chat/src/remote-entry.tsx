
import { createRoot, Root } from 'react-dom/client';
import App from './app/app';

console.log('🚀 remote-entry.tsx carregado!');

// Função mount para React
export function mount(container: HTMLElement): Root {
  console.log('✅ mount() chamado com container:', container);
  console.log('✅ Container tagName:', container?.tagName);
  console.log('✅ Container innerHTML antes:', container?.innerHTML);
  
  const root = createRoot(container);
  root.render(<App />);
  
  console.log('✅ React app renderizado!');
  console.log('✅ Container innerHTML depois:', container?.innerHTML);
  
  return root;
}

// Função unmount para React 18
export function unmount(root: Root): void {
  console.log('🔄 unmount() chamado');
  if (root) {
    root.unmount();
    console.log('✅ React app desmontado');
  }
}

// Exportação padrão para compatibilidade com Angular
const RemoteEntryModule = {
  mount,
  unmount
};

console.log('📦 RemoteEntryModule exportado:', RemoteEntryModule);

export default RemoteEntryModule;