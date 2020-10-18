let path = require('path')
let cwd = process.cwd()
let src = path.resolve(cwd, 'src')
let webpack = require('webpack')

let node_modules = (module) =>
  path.resolve(cwd, 'node_modules', module)

module.exports = function createConfig (webpackEnv) {
  let isEnvDevelopment = webpackEnv === 'development'
  let isEnvProduction = webpackEnv === 'production'
  
  return {
    entry: {
      main: cwd + '/src/main.ts'
    },
    externals: {
        'styled-components': {
          commonjs: 'styled-components',
          commonjs2: 'styled-components',
          amd: 'styled-components'
        },
        react: {
          root: 'React',
          commonjs: 'react',
          commonjs2: 'react',
          amd: 'react'
        },
        'react-dom': {
          commonjs: 'react-dom',
          commonjs2: 'react-dom',
          amd: 'react-dom'
        },
        'react-spring': {
          commonjs: 'react-spring',
          commonjs2: 'react-spring',
          amd: 'react-spring'
        },
     },
    output: {
      globalObject: 'this',
      filename: '[name].js',
      path: cwd + '/lib',
      libraryTarget: 'umd'
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            rootMode: 'upward'
          }
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            rootMode: 'upward'
          }
        },
        {
          test: /\.js$/,
          use: ["source-map-loader"],
          enforce: "pre"
        }
      ]
    },
    resolve: {
      modules: [
        src,
        'node_modules'
      ],
      extensions: ['.ts', '.tsx', '.js', '.json']
    }
  }
}
