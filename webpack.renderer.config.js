module.exports = {
    // Put your normal webpack config below here
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js'],
    },
    externals: {
        fs: 'require("fs")',
    },
    module: {
        rules: require('./webpack.rules'),
    },
};
