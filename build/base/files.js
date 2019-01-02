const path = require('path');

module.exports = ((filesName) => {
    const files = filesName;
    const appPath = path.resolve(files.root, files.appName);
    files.appPath = appPath;
    files.buildPath = path.resolve(files.root, files.buildName);
    files.dllPath = path.resolve(files.root, `${files.buildName}/dll`);
    files.viewPath = path.resolve(appPath, files.viewName);
    files.testPath = path.resolve(appPath, files.testName);
    files.staticPath = path.resolve(files.root, 'static');
    files.componentPath = path.resolve(appPath, files.componentName);
    return files;
  })({
    root: process.cwd(), // 根目录
    appName: 'src',
    buildName: 'dist', // 打包文件
    componentName: 'component', // 公共组件文件
    viewName: 'templates', // 视图模板文件
    testName: 'tests', // 测试文件
  });