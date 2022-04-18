module.exports = {
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './../src'],
        ],
      },
    },
  },
  rules: {
    'vue/valid-template-root': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
  },
};
