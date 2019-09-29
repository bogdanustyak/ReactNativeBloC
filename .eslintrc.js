module.exports = {
    root: true,
    extends: [
        '@react-native-community',
        'airbnb-typescript',
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/react'
    ],
    rules: {
        'lines-between-class-members': 'off',
        'class-methods-use-this': [
            'error',
            { exceptMethods: ['login', 'render'] }
        ]
    }
};
