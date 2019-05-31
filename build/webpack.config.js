const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    app: path.join(__dirname, './../', 'src/index.tsx')
  },
  output: {
    path: path.join(__dirname, './../', 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        // 需要解析什么类型
        test: /\.ts(x?)$/,
        // 使用什么规则来解析对应文件
        use: [
          {
            loader: 'awesome-typescript-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        include: [path.join(__dirname, './../', 'src')],
        use: [
          'style-loader',

          // {
          //   // 配置css-modules css-模块化
          //   /*
          // 什么是css module css module是针对css类名作用域做出限定的一种规范，
          // 用以解决css类名冲突的问题，此外还能避免一些爬虫进行数据爬取(当然厉害的爬虫除外)，同等的还有BEM规范。
          //  */
          //   loader: 'typings-for-css-modules-loader',
          //   options: {
          //     modules: true, // 是否启用css-modules
          //     nameExport: true, // 类名导出
          //     camelCase: true, // 支持驼峰
          //     sass: true, // 是否使用sass
          //     localIdentName: '[local]_[hash:base64:5]'
          //   }
          // },
          'css-loader',
          {
            // node-sass 路径优化, 无论层级多深,在index.scss中引入sass文件都可以直接引入 类似:@import 'var.scss';
            loader: 'sass-loader',
            options: {
              includePaths: [path.join(__dirname, './../', 'src/styles')]
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx', '.css']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'build/tpl/index.html'
    })
  ],
  devServer: {
    // 这是配置 dev-server 命令参数的第二种形式，相对来说麻烦一些
    open: true, // 自动打开浏览器
    port: 3000, // 设置启动时候的运行端口
    // contentBase: 'src', // 指定托管的根目录
    hot: true, // 启动热更新的第一步
    host: '127.0.0.1' // 局域网访问 勿改 调试手动输入 localhost||127.0.0.1
  }
}
