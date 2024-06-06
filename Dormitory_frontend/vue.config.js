// 跨域配置
module.exports = {
    publicPath: './',  // vue-cli3.3+新版本使用

    devServer: {
        // 设置本地默认端口，选填
        // port: 9876,

        // 设置代理，必须填
        proxy: {
            // 设置拦截器，拦截器格式斜杠+拦截器名字，名字可以自己定
            '/api': {
                target: 'http://localhost:9090',  // 本地后端服务的地址
                changeOrigin: true,  // 是否设置同源，输入是的
                pathRewrite: {  // 路径重写
                    '^/api': ''  // 忽略拦截器里面的内容
                }
            },
            '/weather-api': {  // 新增一个拦截器名为 weather-api
                target: 'https://api.open-meteo.com',  // Open-Meteo API 的地址
                changeOrigin: true,
                pathRewrite: {
                    '^/weather-api': ''  // 忽略拦截器里面的内容
                }
            }
        }
    }
}
