module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://8.130.172.158/',
        changeOrigin: true,
        ws: true,
        secure: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}