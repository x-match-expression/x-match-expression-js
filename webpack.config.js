var path = require('path');

module.exports = [
    {
        entry: {
            "index": path.resolve(__dirname, './dist/esm/index.js')
        },
        output: {
            path: path.resolve(__dirname, 'dist/umd'),
            filename: '[name].js',
            libraryTarget: "umd",
            globalObject: 'this',
            umdNamedDefine: true,
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: "babel-loader"
                }
            ]
        }
    },
    {
        entry: {
            "index": path.resolve(__dirname, './dist/esm/index.js')
        },
        output: {
            path: path.resolve(__dirname, 'dist/browser'),
            filename: '[name].js',
            library: 'match', // name of the global object
            libraryTarget: "umd",
            globalObject: 'this',
            umdNamedDefine: true,
            libraryExport: 'match' // we expose the match function directly
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: "babel-loader"
                }
            ]
        }
    }
];