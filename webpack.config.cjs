const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');  // Import TerserPlugin

module.exports = {
  entry: './src/agora.js', // Your JavaScript entry point
  output: {
    filename: 'agora-bundle.js',  // Output JavaScript bundle
    path: path.resolve(__dirname, 'dist'),  // Output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Transpile JS with Babel
        },
      },
      {
        test: /\.css$/, 
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS in production
          'css-loader', // Handle @import and url()
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'agora-bundle.css',  // Output CSS file
    }),
  ],
  optimization: {
    minimize: true, // Enable minification for production builds
    minimizer: [
      new TerserPlugin({ // Minify JavaScript files
        terserOptions: {
          compress: {
            drop_console: true, // Remove console logs
          },
        },
      }),
      new CssMinimizerPlugin(), // Minify CSS files
    ],
  },
  mode: 'production', // Use 'production' for minification
};
