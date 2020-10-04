const path = require('path')
const fs = require('fs');

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: './src/client/main.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        publicPath: 'public',
        filename: 'bundle.js',
        path: path.resolve(__dirname, './public'),
    },
    devServer: { 
        compress: true,
        port: 12345,
        https: {
            key: fs.readFileSync('./resources/server.key'),
            cert: fs.readFileSync('./resources/server.crt'),
            ca: fs.readFileSync('./resources/server.pem'),
          }
    },
}
