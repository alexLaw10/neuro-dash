declare module 'mfe-agents/Module' {
  export const RemoteEntryModule: any;
}

declare module 'mfe-chat/Module' {
  export const RemoteEntryModule: any;
}

// Declaração do Web Component
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'chat-web-component': any;
    }
  }
}
