const { RemaxIconfontPlugin } = require("remax-iconfont-plugin");
module.exports = {
  plugins: [
    RemaxIconfontPlugin({
      // 将上面的CSS加入到此处
      cssURL: "http://at.alicdn.com/t/font_2380740_u6i061nzub.css",
    }),
  ],
};
