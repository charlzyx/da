const baseConfig =require('./webpack.base');
const HtmlWebpackPlugin =require('html-webpack-plugin');
const MiniCssExtractPlugin =require('mini-css-extract-plugin');
const MonacoPlugin =require('monaco-editor-webpack-plugin');
// const { BundleAnalyzerPlugin } =require('webpack-bundle-analyzer');
const path =require('path');

const createPages = (pages) => {
  return pages.map(({ filename, template, chunk }) => {
    console.log("----------------chunk", chunk)
    return new HtmlWebpackPlugin({
      filename,
      template,
      inject: 'body',
      // chunks: chunk,
    })
  })
}

module.exports = {
  ...baseConfig,
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    ...createPages([
      {
        filename: 'index.html',
        template: path.resolve(__dirname, './template.ejs'),
        chunk: ['playground', 'deps', 'designable', 'formily', 'vendor'],
      },
    ]),
    new MonacoPlugin({
      languages: ['json'],
    }),
    // new BundleAnalyzerPlugin()
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minChunks: 1,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        deps: {
          test: /[\\/]node_modules[\\/]/,
          priority: -11,
          reuseExistingChunk: true,
        },
        designable: {
          test: /@designable/,
          priority: -10,
          reuseExistingChunk: true,
        },
        formily: {
          test: /@formily/,
          priority: -10,
          reuseExistingChunk: true,
        },
        vendor: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
}
