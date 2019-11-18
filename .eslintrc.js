module.exports = {
  plugins: ['prettier'],
  "env": {
    "es6": true
},
"ecmaFeatures": {
    // env=es6 doesn't include modules, which we are using
    "modules": true
},
"extends": "eslint:recommended",
  rules: {
    'prettier/prettier': 'error',
    'jsx-a11y/href-no-hash': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,

    'react/forbid-prop-types': 0,
    'react/display-name': [0],

    'react/jsx-max-props-per-line': [
      'error',
      {
        maximum: 5,
        when: 'multiline'
      }
    ],

    'no-use-before-define': 0,
    'no-param-reassign': 0,
    'consistent-return': 0,
    'object-property-newline': 0,
    'object-curly-newline': 0,
    'function-paren-newline': 0,
    'class-methods-use-this': 0,
    'arrow-body-style': 0,
    'no-lonely-if': 'error',
    'default-case': 'off',
    'keyword-spacing': ['error', { before: true, after: true }],

    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.stories.jsx', '**/*.spec.js']
      }
    ],

    'comma-dangle': ['error', 'never'],

    'prefer-destructuring': [
      'error',
      {
        array: false,
        object: true
      },
      {
        enforceForRenamedProperties: false
      }
    ],

    'key-spacing': [
      'error',
      {
        mode: 'strict'
      }
    ],

    'jsx-quotes': ['error', 'prefer-double'],

    'object-curly-spacing': ['error', 'always'],

    'for-direction': ['error'],

    indent: ['error', 2, { SwitchCase: 1 }],

    'linebreak-style': ['error', 'unix'],

    'max-len': ['error', 100],

    semi: ['error', 'always'],

    quotes: ['error', 'single'],

    'no-underscore-dangle': [
      'error',
      {
        allow: [
          '__COVERAGE__',
          '__DEV__',
          '__PROD__',
          '__TEST__',
          '___INITIAL_STATE__',
          '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__',
          '__karmaWebpackManifest__'
        ]
      }
    ]
  }
};
