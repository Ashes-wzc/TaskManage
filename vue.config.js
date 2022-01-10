module.exports = {
  devServer: {
    proxy: {
      '/apis': {
        target: 'http://47.106.112.28',
        changeOrigin: true,
        ws: true,
        // secure: false,
        pathRewrite: {
          '^/apis': ''
        }
      }
    }
  }
}