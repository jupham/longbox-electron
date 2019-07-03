// eslint-disable-next-line @typescript-eslint/no-var-requires
var webpack = require('webpack');

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
    plugins: [
        new webpack.NormalModuleReplacementPlugin(/typeorm$/, function(result) {
            result.request = result.request.replace(
                /typeorm/,
                'typeorm/browser'
            );
        }),
        new webpack.ProvidePlugin({
            'window.SQL': 'sql.js/js/sql.js',
        }),
    ],
};
