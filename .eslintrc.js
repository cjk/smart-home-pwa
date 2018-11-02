module.exports = {
  parser: 'babel-eslint',
  parserOptions: { ecmaVersion: 9 },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:flowtype/recommended', 'plugin:react/recommended'],
  plugins: ['flowtype'],
  globals: {
    window: true,
    EventHandler: true,
    ReactClass: true,
  },
  rules: {
    'arrow-parens': 0, // Does not work with Flow generic types.
    'import/first': 0, // Este sorts by atom/sort lines natural order.
    'import/prefer-default-export': 0, // Actions can have just one action.
    indent: 0, // Prettier.
    'function-paren-newline': 0, // Prettier.
    'object-curly-newline': 0, //Prettier.
    'no-confusing-arrow': 0, // This rule is confusing.
    'no-mixed-operators': 0, // Prettier.
    'no-nested-ternary': 0, // Buggy for functional componenents.
    'no-param-reassign': 0, // We love param reassignment. Naming is hard.
    'no-shadow': 0, // Shadowing is a nice language feature. Naming is hard.
    'no-underscore-dangle': 0, // Control freaky.
    'react/jsx-closing-bracket-location': 0, // Prettier.
    'react/jsx-closing-tag-location': 0, // Prettier.
    'react/jsx-filename-extension': 0, // JSX belongs to .js files.
    'react/jsx-indent': 0, // Prettier.
    'react/jsx-indent-props': 0, // Prettier.
    'react/jsx-wrap-multilines': 0, // Prettier.
    'react/no-unused-prop-types': 0, // Buggy and we don't need it with Flow.
    'react/prop-types': 0, // We don't need it with Flow.
    'react/react-in-jsx-scope': 0, // Next.js injects it. Should be default.
    'react/require-default-props': 0, // We don't need it with Flow.
    'react/no-danger': 0, // Control freaky.
    'template-curly-spacing': 0, // Prettier.
    'space-before-function-paren': 0, // Prettier
    'react/jsx-boolean-value': 0, // Control freaky.
    // misc (CjK)
    'comma-dangle': ['error', 'only-multiline'],
    'max-len': ['error', 120, { ignoreComments: true }],
    'one-var': 0,
  },
  settings: {
    react: {
      createClass: 'createReactClass', // Regex for Component Factory to use,
      // default to "createReactClass"
      pragma: 'React', // Pragma to use, default to "React"
      // version: '16.6', // React version, default to the latest React stable release
      flowVersion: '0.53', // Flow version
    },
    propWrapperFunctions: ['forbidExtraProps'], // The names of any functions used to wrap the
    // propTypes object, e.g. `forbidExtraProps`.
    // If this isn't set, any propTypes wrapped in
    // a function will be skipped.
  },
}
