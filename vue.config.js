module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://8.130.172.158/v2/api-docs/',
        changeOrigin: true,
        ws: true,
        // secure: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}