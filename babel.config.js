module.exports = function (api) {
  api.cache(true);

  let presets = [
    "@babel/preset-flow",
    "@babel/preset-env",
    ["@babel/preset-react", { "development": true }]
  ]

  let plugins = []

  return {
    presets,
    plugins
  }
}
