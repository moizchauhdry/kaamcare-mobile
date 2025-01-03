module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'babel-plugin-inline-import',
        {
          extensions: ['.svg'],
        },
      ],
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
            '.styles.tsx',
            '.styles.ts',
            '.data.tsx',
            '.data.ts',
            '.hooks.tsx',
            '.hooks.ts',
            '.types.tsx',
            '.types.ts',
            '.svg',
          ],
        },
      ],
    ],
  };
};
