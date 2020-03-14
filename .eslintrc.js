module.exports = {
  'extends': 'google',
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module',
  },
  'rules': {
    'max-len': 'off',
    'no-restricted-modules': 'off',
    'valid-jsdoc': 'off',
    'guard-for-in': 'off',
  },
  'plugins': [
    'html',
  ],
};
