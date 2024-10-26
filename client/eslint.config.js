import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
      files: ['**/*.{js,jsx,ts,tsx}'],
      languageOptions: {
            ecmaVersion: 2022,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'no-console': 'warn',
            'eqeqeq': 'error', // ===
            'curly': ['error', 'all'], // if {}
            'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }], // Ostrzega o nieużywanych zmiennych, ale ignoruje te zaczynające się od "_"
            'react/react-in-jsx-scope': 'off',
            'semi': ['error', 'always'],
        },
        settings: {
            'import/resolver': {
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                },
            },
        },
    },
);
