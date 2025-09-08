    module.exports = {
      presets: ['babel-preset-expo'],
      plugins: [
        [
          'module-resolver',
          {
            root: ['./src'], // This is the root of your application code
            alias: {
              // Add aliases for specific directories if needed
              '@myapp/components': './src/components',
              '@myapp/assets': './src/assets',
              '@myapp/navigation': './src/navigation',
              '@myapp/features': './src/features',
              '@myapp/hooks': './src/hooks',
              '@myapp/utils': './src/utils',
              '@myapp/store': './src/store',
              '@myapp/i18n': './src/i18n',
            },
          },
        ],
      ],
    };