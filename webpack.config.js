const path = require('path')
const webpack = require("webpack")
const CopyWebPack = require('copy-webpack-plugin')
const about = require(path.resolve(__dirname, "package.json"))

const ProjectDIR = path.resolve(__dirname) + '/'
const SourceDIR = ProjectDIR + 'src/'
const BuildDIR = ProjectDIR + './build/frontend/' + 'app'
const Mode = 'development'

const config = {

    mode: Mode,

    entry: {
        app: SourceDIR + 'index.tsx'
    },

    externals: {},

    output: {
        path: path.resolve(BuildDIR),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript',
                            '@babel/preset-react'
                        ],
                        plugins: [
                            '@babel/proposal-class-properties',
                            '@babel/proposal-object-rest-spread',
                            '@babel/plugin-transform-runtime',
                            ["@babel/plugin-transform-typescript", { allowNamespaces: true }],
                            ['@babel/plugin-proposal-optional-chaining', {
                                loose: true
                            }]
                        ]
                    }
                },
                include: [
                    path.resolve(SourceDIR),
                ],
            }
        ],
    },
    resolve: {
        modules: ['node_modules', SourceDIR],
        alias: { 'src': SourceDIR },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.mjs', '.gql']
    },

    target: 'web',
    context: __dirname,
    performance: {
        hints: 'warning',
        maxAssetSize: 500000,
        maxEntrypointSize: 500000,
    },
    stats: 'errors-only',
}

const plugins = [
    //moment optimizations
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
]


/**s
 * Копируем файлы
 */
plugins.push(new CopyWebPack([
    { from: ProjectDIR + 'public/index.html' },
]))

/**
 * Настройки для дебага
 */
config.devtool = 'source-map'
config.performance = {
    hints: false,
},
    config.devServer = {
        host: '0.0.0.0',
        hot: true,
        inline: true,
        historyApiFallback: true,
    }
plugins.push(new webpack.NamedModulesPlugin())
plugins.push(new webpack.HotModuleReplacementPlugin())

config.plugins = plugins

module.exports = config


