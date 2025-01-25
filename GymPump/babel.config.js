module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env', // Nome do módulo para acessar as variáveis
          path: '.env', // Caminho do arquivo .env
        },
      ],
    ],
  };
};
