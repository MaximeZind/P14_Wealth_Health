module.exports = {
  "env": {
      "browser": true,
      "es2021": true
  },
  "extends": [
      "plugin:react/recommended"
  ],
  "overrides": [
  ],
  "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module"
  },
  "plugins": [
      "react"
  ],
  "rules": {
      "eqeqeq": ["warn", "always"],
      "no-unused-vars": ["warn"],
      "no-trailing-spaces": ["warn"],
      "react/prop-types": ["warn"],
      "spaced-comment": ["warn"]
  }
}