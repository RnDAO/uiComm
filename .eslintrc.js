module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'simple-import-sort', 'unused-imports'],
  extends: [
    'eslint:recommended',
    'next',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    'no-unused-vars': 'off', // Disabling base rule as it's handled by @typescript-eslint/no-unused-vars
    'no-console': 'warn', // Allow console with warning to identify usage
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Disabling requirement for explicit return types on functions
    'react/no-unescaped-entities': 'off', // Disable warnings for unescaped entities in JSX
    'react/display-name': 'off', // Disable display name rule for React components
    'react/jsx-curly-brace-presence': [
      'warn',
      { props: 'never', children: 'never' },
    ], // Enforce no unnecessary curly braces in JSX
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'off',
    'no-empty': 'off',
    'no-fallthrough': 'off',
    'react/jsx-key': 'warn',
    'react/no-children-prop': 'off',
    'no-prototype-builtins': 'warn',
    'no-case-declarations': 'warn',
    'react-hooks/exhaustive-deps': 'off',

    // Disable rule for unused vars but enable warning for unused imports and vars with specific patterns
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_', // Ignore vars with _ prefix
        args: 'after-used',
        argsIgnorePattern: '^_', // Ignore args with _ prefix
      },
    ],

    // Configuring import sorting
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          ['^@?\\w', '^\\u0000'],
          ['^.+\\.s?css$'],
          ['^@/lib', '^@/hooks'],
          ['^@/data'],
          ['^@/components', '^@/container'],
          ['^@/store'],
          ['^@/'],
          [
            '^\\./?$',
            '^\\.(?!/?$)',
            '^\\.\\./?$',
            '^\\.\\.(?!/?$)',
            '^\\.\\./\\.\\./?$',
            '^\\.\\./\\.\\.(?!/?$)',
            '^\\.\\./\\.\\./\\.\\./?$',
            '^\\.\\./\\.\\./\\.\\.(?!/?$)',
          ],
          ['^@/types'],
          ['^'],
        ],
      },
    ],
  },
  globals: {
    React: 'writable', // Updated to 'writable' to reflect correct usage
    JSX: true,
  },
};
