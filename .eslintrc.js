module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
    'jest': true
  },
  'globals': {
    'it': true,
    'expect': true,
    'module': true,
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'parser': 'babel-eslint',
  'plugins': ['react'],
  'rules': {
    'indent': ['off', 2, { 'SwitchCase': 1 }],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'warn',
      'never'
    ],
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'no-case-declarations': 0,
    'no-console': ['error', { allow: ['warn', 'error'] }]
  }
}
