module.exports = {
  name: 'mfe-shell',
  remotes: [
    ['mfe-agents', 'http://localhost:4201'],
    ['mfe-chat', 'http://localhost:4202']
  ],
  shared: (libraryName, sharedConfig) => {
    if (['@angular/core', '@angular/common', '@angular/router', '@angular/platform-browser', '@angular/platform-browser-dynamic', 'rxjs', 'zone.js'].includes(libraryName)) {
      return { singleton: true, strictVersion: false, requiredVersion: '^16.2.0' };
    }
    return sharedConfig;
  }
};
