module.exports = {
  // Put your normal webpack config below here
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: require('./webpack.rules'),
  },
};
