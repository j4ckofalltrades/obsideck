import eslintConfigPrettier from "eslint-config-prettier"

export default [
  eslintConfigPrettier,
  {
    languageOptions: {
      "sourceType": "module",
      "ecmaVersion": 2017
    },
    rules: {
      indent: [
        "error",
        2
      ],
      "linebreak-style": [
        "error",
        "unix"
      ],
      quotes: [
        "error",
        "double"
      ],
      semi: [
        "error",
        "never"
      ]
    }
  }
]