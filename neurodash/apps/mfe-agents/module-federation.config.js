module.exports = {
  name: 'mfe-agents',
  filename: 'remoteEntry.mjs',
  exposes: {
    './Module': 'apps/mfe-agents/src/app/remote-entry/entry.module.ts',
  },
  shared: (libraryName, sharedConfig) => {
    if (['@angular/core', '@angular/common', '@angular/router', '@angular/platform-browser', '@angular/platform-browser-dynamic', 'rxjs', 'zone.js'].includes(libraryName)) {
      return { singleton: true, strictVersion: false, requiredVersion: '^16.2.0' };
    }
    return sharedConfig;
  }
};
