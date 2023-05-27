// 每次调用ajax时会先调用这个，这个函数可以拿到我们传递给ajax的配置对象
$.ajaxPrefilter(function(options){
options.url = 'http://ajax.frontend.itheima.net' + options.url
})
