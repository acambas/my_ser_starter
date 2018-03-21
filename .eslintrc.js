module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    "no-console": "off",
    "react/prop-types": "off",
    camelcase: 0,
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": [
      "error",
      {
        jsxBracketSameLine: true,
        trailingComma: "all",
        printWidth: 80,
        singleQuote: true,
        semi: false
      }
    ]
  },
  env: {
    jest: true,
    browser: true,
    node: true
  },
  globals: {"Promise": true},
  plugins: ["react", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier/react",
    "prettier"
  ]
};
