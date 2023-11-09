$(function(){
// 自定义校验规则
var form = layui.form
form.verify({
  pwd:[
    /^[\S]{6,12}$/
    ,'密码必须6到12位，且不能出现空格'
  ],
  samePwd:function(value){
    if(value === $('[name=old_pwd]').val()){
      return '新旧密码不能相同'
    }
  },
  rePwd:function(value){
    if(value !== $('[name = new_pwd]').val()){
      return '两次密码输入不一致'
    }
  }
})




  $('.layui-form').on('submit',function(e){
    e.preventDefault()

    // formData数据转为对象
    var data = {}
    var formData = $(this).serialize()
    var arr = formData.split('&')
    $.each(arr ,function(i,item){
      var newItem = item.split('=')
      data[newItem[0]] = newItem[1]
    })

    // 发起ajax请求
    $.ajax({
      method:'PATCH',
      url:'/my/updatepwd',
      data:JSON.stringify(data),
      contentType:'application/json',
      success:function(res){
        if(res.code !== 0){
          return layui.layer.msg('修改密码失败')
        }
        layui.layer.msg('修改密码成功')
        $('.layui-form')[0].reset()
      }
    })
  })
})