import eslintPluginTypeScript from '@typescript-eslint/eslint-plugin';
import eslintParserTypeScript from '@typescript-eslint/parser';

export default [
    {
        files: ['**/*.ts'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            parser: eslintParserTypeScript,
            parserOptions: {
                project: './tsconfig.json'
            }
        },
        plugins: {
            '@typescript-eslint': eslintPluginTypeScript,
        },
        rules: {
            // Przykładowe reguły TypeScript, które były wcześniej zawarte w pluginie @typescript-eslint/recommended
            '@typescript-eslint/adjacent-overload-signatures': 'error',
            '@typescript-eslint/no-array-constructor': 'error',
            '@typescript-eslint/no-empty-function': 'warn',
            '@typescript-eslint/no-empty-interface': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-inferrable-types': 'warn',
            '@typescript-eslint/no-misused-new': 'error',
            '@typescript-eslint/no-namespace': 'error',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            '@typescript-eslint/no-this-alias': 'warn',
            '@typescript-eslint/no-var-requires': 'off', // Tak jak chciałeś wyłączyć

            // Własne reguły projektu
            'no-console': 'warn',
            'eqeqeq': 'error',
            'curly': ['error', 'all'],
            'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
            'semi': ['error', 'always']
        },
        settings: {
            'import/resolver': {
                node: {
                    extensions: ['.js', '.ts']
                }
            }
        }
    }
];
