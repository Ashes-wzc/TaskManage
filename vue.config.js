module.exports = {
  devServer: {
    proxy: {
      '/apis': {
        target: 'http://101.132.109.139',
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