$(function(){
  var form = layui.form
  var layer = layui.layer

  // 标单验证
  form.verify({
    nickname:function(value){
      if(value.length > 6){
        return '昵称必须在1 - 6位之间'
      }
    }
  })
  initUserInfo()

  // 获取用户信息
  function initUserInfo(){
    $.ajax({
      method:'GET',
      url:'/my/userinfo',
      success:function(res){
        if(res.code !==0){
          return layer.msg('获取用户信息失败！')
        }
        form.val('formUserInfo',res.data)
      }
    })
  }


  // 重置表单数据
  $('#btnReset').on('click',function(e){
    e.preventDefault()
    initUserInfo()
  })

  // 监听表单提交事件
  $('.layui-form').on('submit',function(e){
    e.preventDefault()

    // 格式化formData成对象，方便改成json格式
    var formData =  $(this).serialize()
    var arr = formData.split('&')
    var data = {}
    $.each(arr,function(i,item){
      var newItem = item.split('=')
      data[newItem[0]] = newItem[1]
    })
    // @符号通过serialize会变成%40
    data.email = data['email'].split('%40').join('@')
    console.log(data);
   $.ajax({
      method:'PUT',
      url:'/my/userinfo',
      contentType:'application/json',
      data:JSON.stringify(data),
      success:function(res){
        if(res.code !== 0 ){
          return layer.msg('更新个人信息失败')
        }
        layer.msg('更新个人信息成功')
        window.parent.getUserData()
      }
    })
  })
})