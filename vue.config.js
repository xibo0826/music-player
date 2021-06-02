module.exports = {
  configureWebpack: {
    resolve: {
      // 配置别名
      alias: {
        assets: '@/assets',
        plugins: '@/plugins',
        components: '@/components',
        views: '@/views',
      },
    },
  },
}
