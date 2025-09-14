declare module 'mfe-agents/Module' {
  export const RemoteEntryModule: any;
}

declare module 'mfe-chat/Module' {
  interface ReactRoot {
    unmount(): void;
  }
  
  interface RemoteModule {
    mount: (container: HTMLElement) => ReactRoot;
    unmount: (root: ReactRoot) => void;
  }
  
  export const mount: (container: HTMLElement) => ReactRoot;
  export const unmount: (root: ReactRoot) => void;
  export default RemoteModule;
}

// Declaração do Web Component
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'chat-web-component': any;
    }
  }
}
