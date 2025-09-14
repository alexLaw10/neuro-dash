// apps/mfe-chat/src/app/app.tsx
import React from 'react';

export default function App() {
  console.log('🎨 App.tsx renderizando...');
  
  return (
    <div style={{ 
      padding: '20px', 
      border: '2px solid #007acc', 
      borderRadius: '8px',
      backgroundColor: '#f0f8ff',
      color: '#333',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2>🚀 Chat React MFE</h2>
      <p>Este é o micro-frontend React funcionando dentro do Angular!</p>
      <button 
        onClick={() => alert('React funcionando!')}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007acc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Testar React
      </button>
    </div>
  );
}
