/*
 * @Author: sam.li
 * @Date: 2021-06-01 14:42:02
 * @LastEditors: sam.li
 * @LastEditTime: 2021-06-01 14:46:00
 */
// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    globals: {
        WebViewJavascriptBridge: 'readonly',
        WVJBCallbacks: 'readonly',
    },
    rules: {
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
    },
};
