const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')

const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'docs')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']]
              }
            }
          }
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source'
      },
      {
        test: /\.(png|svg|jpg|jpeg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },

     
      {
        test: /\.(ttf|otf|woff|woff2)$/i,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
    }),


    // Index
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),


// Разделы
new HtmlWebpackPlugin({
  template: './src/clause.html',
  filename: './clause.html',
}),
new HtmlWebpackPlugin({
  template: './src/instructions.html',
  filename: './instructions.html',
}),
new HtmlWebpackPlugin({
  template: './src/langflo.html',
  filename: './langflo.html',
}),
new HtmlWebpackPlugin({
  template: './src/aboutpr.html',
  filename: './aboutpr.html',
}),

    // Статьи
    new HtmlWebpackPlugin({
      template: './src/clause/newproducts.html',
      filename: './clause/newproducts.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/clause/interior.html',
      filename: './clause/interior.html',
    }),
    // new HtmlWebpackPlugin({
    //   template: './src/langflo/colorvalues.html',
    //   filename: './langflo/colorvalues.html',
    // }),
    // new HtmlWebpackPlugin({
    //   template: './src/aboutpr/info.html',
    //   filename: './aboutpr/info.html',
    // }),
    new HtmlWebpackPlugin({
      template: './src/instructions/popular.html',
      filename: './instructions/popular.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/instructions/compilations.html',
      filename: './instructions/compilations.html',
    }),


    // Partials
    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, './src/partials/analytics.html'),
        location: 'analytics',
        template_filename: '*',
        priority: 'replace'
      }
    ])
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()]
  }

}