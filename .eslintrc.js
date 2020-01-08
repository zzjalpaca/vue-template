module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 函数名与括号间不叫空格
    "space-before-function-paren": [2, { "anonymous": "never", "named": "never" }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}