module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import '@/scss/_mixins';
        @import '@/scss/_variables';`,
      }
    }
  },
}