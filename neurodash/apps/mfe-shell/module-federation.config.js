module.exports = {
  name: 'mfe-shell',
  remotes: [
    ['mfe-agents', 'http://localhost:4201/remoteEntry.mjs'],
    ['mfe-chat', 'http://localhost:4202/remoteEntry.mjs'],
  ],
};
