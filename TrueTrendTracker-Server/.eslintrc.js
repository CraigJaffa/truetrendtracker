module.exports = {
    env: {
        browser: true,
        node: true,
        jest: true,
        es6: true
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:jest/recommended',
        'standard'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint', 'jest'],
    ignorePatterns: ['**/*.js'],
    rules: {
        indent: [2, 'tab'],
        'no-tabs': 0,
        quotes: [2, 'single', { avoidEscape: true }],
        "camelcase": "off"
    }
}