module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-config-standard'],
  plugins: [
    'stylelint-scss',
  ],
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
  ignoreFiles: ['./src/styles/generic/_reset.scss'],
  rules: {
    'string-quotes': 'single',
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['after-same-name'],
        ignore: ['after-comment'],
        ignoreAtRules: ['else'],
      },
    ],
    'block-closing-brace-newline-after': [
      'always-multi-line',
      {
        ignoreAtRules: ['if', 'else'],
      },
    ],
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: [/^map\..*/, /^meta\..*/, /^functions\..*/, 'map-deep-merge'],
      },
    ],
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
  },
};
