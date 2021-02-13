module.exports = function (api) {
  api.cache(true);

  let presets =
    [ '@babel/preset-flow'
    , '@babel/typescript'
    , ['@babel/preset-react', { 'development': true }]
    , '@babel/preset-env'
    ]

  let plugins =
    [ '@babel/plugin-proposal-class-properties'
    , 'babel-plugin-styled-components'
    , 'lodash'
    , 'macros'
    ]

  return {
    presets,
    plugins
  }
}
