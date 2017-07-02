module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    semi: 2,
    "no-console": "off",
    "react/prop-types": "off",
    camelcase: 0,
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        jsxBracketSameLine: true,
        trailingComma: "es5",
        printWidth: 80
      }
    ]
  },
  env: {
    jest: true,
    browser: true,
    node: true
  },
  plugins: ["react", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier/react",
    "prettier"
  ]
};
