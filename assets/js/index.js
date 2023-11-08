var layer = layui.layer
$(function(){
  getUserData()
  $('.logout').on('click',function(){
    layer.confirm('是否退出登录？', {icon: 3, title:'提示'}, function(index){
      location.href = '/login.html'
      localStorage.removeItem('token')
      layer.close(index);
    });
  })
})
function getUserData(){
  $.ajax({
    method:'GET',
    url:'/my/userinfo',
    // headers:{
    //   Authorization:localStorage.getItem('token') || ''
    // },
    success:function(res){
      if(res.code !== 0){
        return layui.layer.msg('获取用户数据失败')
      }
   
      rendenUserInfo(res.data)
    },
    
  })
}
function rendenUserInfo(user){
  var name = user.nickname || user.username

  $('.welcome').html('欢迎&nbsp;&nbsp;' + name)
  if(user.user_pic !== null){
    // 有图片，渲染图片
    $('.layui-nav-img').attr('src',user.user_pic).show()
    $('.text-avatar').hide()

  }else{
    // 无图片，渲染文本头像
    var firstName = user.username[0].toUpperCase()
    $('.layui-nav-img').hide()
    $('.text-avatar').html(firstName)
  }
}