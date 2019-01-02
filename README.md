# 项目介绍
## 技术栈
- Backbone
- jQuery
- underscore
- express
- ejs

 
# 本地开发
- npm run dll: 确保项目clone下来之后，至少运行过一次
- npm start: 本地开发，支持前端热更新，和后端模板的热更新
- npm run preview: 构建打包，本地预览
- npm run deploy: 构建线上部署版本，文件地址等已经替换成CDN
- npm server: 启动服务器(用于单纯的启动服务)

# 注意事项
1. 因为IE8不支持Webpack的热更新机制，每次只能构建之后才能查看效果，建议使用其他现代浏览器开发，在IE8上回归
2. 因为需要兼容IE8，不允许使用es7新语法，支持部分es6语法，但 Promise 使用方式跟标准的ES6有所不同
3. 模块管理使用commonJS 规范，使用 require
4. 在Backbone的template中请使用原生ES语法, 禁止 ES6 / ES5 forEach

