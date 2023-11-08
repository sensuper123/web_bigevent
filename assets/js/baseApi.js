$.ajaxPrefilter(function(options){
  options.url = 'http://big-event-vue-api-t.itheima.net' + options.url
  if(options.url.indexOf('/my/') !== -1){
    options.headers = {
      Authorization:localStorage.getItem('token') || ''
    }
  }
  // 全局挂载权限验证失败后执行的函数
  options.complete = function(res){
     if(res.responseJSON.code  === 1 && res.responseJSON.message === '身份认证失败！'){
        localStorage.removeItem('token')
        location.href = '/login.html'
    }
  }
})