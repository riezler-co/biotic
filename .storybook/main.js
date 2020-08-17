let path = require('path')
let fs = require('fs')

module.exports = {
  'stories': [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  'addons': [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-viewport'
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need

    let packages = path.resolve(__dirname, '../packages')
    fs.readdirSync(packages).forEach(pkg => {
      config.resolve.alias[`@package/${pkg}`] = path.resolve(packages, pkg, 'src')
    })

    // Return the altered config
    return config;
  },
}