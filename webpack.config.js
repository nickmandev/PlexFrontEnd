module.exports = {
  // This is the "main" file which should include all other modules
  entry: './src/main.js',
  // Where should the compiled file go?
  output: {
    // To the `dist` folder
    path: './dist',
    // With the filename `build.js` so it's dist/build.js
    filename: 'build.js'
  },
  module: {
    // Special compilation rules
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.s[a|c]ss$/,
        loader: 'style!css!sass'
      }]
  },
  vue: {
    loaders: {
      scss: 'style!css!sass'
    }
  }
}
