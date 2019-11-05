module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "plugins": ["jsx-a11y", "import"],
  "rules": {
    "linebreak-style": ["off"],
    "no-undef": ["error"],
    "semi": ["warn"],
    "import/prefer-default-export": ["off"],
    "no-underscore-dangle": ["warn"]
  },
  "settings": {
    "import/resolver": {
      "@dom": { someConfig: value },
    }
  }
}
