let css = require('lightningcss');
let pkg = require('../package.json');
let { cssModules } = pkg['@parcel/transformer-css']

module.exports = {
  process(sourceText, sourcePath, _options) {
  	let result = css.transform({
  	  filename: sourcePath,
  	  code: Buffer.from(sourceText),
  	  minify: false,
  	  sourceMap: false,
  	  cssModules,
  	})

  	let defs = Object
  		.entries(result.exports)
  		.map(([key, value]) => [key, value.name])

    return {
      code: `module.exports = ${JSON.stringify(Object.fromEntries(defs))};`,
    };
  },
};