module.exports = {
  name: 'mfe_chat',
  filename: 'remoteEntry.mjs',
  exposes: {
    './Module': './src/remote-entry.tsx',
  },
  shared: {
    react: { 
      singleton: true, 
      strictVersion: false, 
      requiredVersion: '^18.2.0',
      eager: false
    },
    'react-dom': { 
      singleton: true, 
      strictVersion: false, 
      requiredVersion: '^18.2.0',
      eager: false
    },
    'react-router-dom': { 
      singleton: true, 
      strictVersion: false, 
      requiredVersion: '^6.11.2',
      eager: false
    },
  },
};
