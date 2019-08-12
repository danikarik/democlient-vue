module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': [
      2,
      'never'
    ],
    'comma-dangle': [
      2,
      'never'
    ],
    'no-unused-vars': [
      2,
      {
        'ignoreSiblings': true,
        'argsIgnorePattern': 'res|next|options|^err'
      }
    ],
    'quotes': [
      2,
      'single',
      {
        'avoidEscape': true,
        'allowTemplateLiterals': true
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
