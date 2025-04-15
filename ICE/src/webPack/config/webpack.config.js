import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';
import { fileURLToPath } from 'url';

// Handling module URLs for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  // Enable source map generation for debugging
  devtool: 'source-map',

  // Entry point of your application
  entry: './src/index.js',

  // Output directory and filename for the bundle
  output: {
    filename: 'bundle.js', // The final bundle file
    path: path.resolve(__dirname, '../dist'), // Path to output directory
  },

  plugins: [
    // HTML Webpack Plugin to inject the bundle into the HTML template
    new HtmlWebpackPlugin({
      template: './public/index.html', // Path to the HTML template
      inject: 'body', // Inject the script at the end of the body
    }),

    // Copy Webpack Plugin to copy static assets like images
    new CopyWebpackPlugin({
      patterns: [
        { from: './public/img', to: 'img' } // Copy images to the dist/img folder
      ]
    })
  ],

  // Development server configuration
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Static file serving directory
    },
    compress: true, // Enable gzip compression
    port: 9000, // Port for the dev server
    open: true, // Automatically open the browser
  },

  module: {
    rules: [
      // Rule for loading image files (png, jpg, jpeg, gif, svg)
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader', // Handle image loading
        options: {
          esModule: false, // Disable ES Module support for file-loader
          name: '[name].[contenthash].[ext]', // Use contenthash in the filename for cache-busting
          outputPath: 'img', // Place images in the 'img' folder in the output directory
        },
      },

      // Rule for loading .ejs files using ejs-loader
      {
        test: /\.ejs$/, // Match all EJS files
        loader: 'ejs-loader', // Use ejs-loader for EJS files
        options: {
          esModule: false, // Disable ES Module support for ejs-loader
        },
      },
    ],
  },
};