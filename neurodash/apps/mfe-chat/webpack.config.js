const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const config = require('./module-federation.config');

module.exports = composePlugins(withNx(), withReact(), (webpackConfig) => {
  webpackConfig.plugins.push(
    new ModuleFederationPlugin(config)
  );

  webpackConfig.output.publicPath = 'http://localhost:4202/';
  webpackConfig.optimization = {
    ...webpackConfig.optimization,
    runtimeChunk: false,
  };

  // Configurar library type para evitar erro de identificador
  webpackConfig.output.library = {
    type: 'var',
    name: 'mfe_chat'
  };

  return webpackConfig;
});