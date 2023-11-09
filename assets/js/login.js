$(function(){


  $('#link_reg').on('click',function(){
    $('.login-box').hide()
    $('.reg-box').show()
  })
  $('#link_login').on('click',function(){
    $('.login-box').show()
    $('.reg-box').hide()
  })


  var form = layui.form
  var layer = layui.layer
  form.verify({
    pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
    repwd:function(value){
      var val = $('#pwdValue').val()
      console.log(val);
      if(val !== value){
        return '两次密码不一致'
      }
    }
  })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
      console.log($('#form_reg [name=username]').val());
      e.preventDefault()
      console.log();
      var formData = {username:$('#form_reg [name=username]').val(),
      password:$('#form_reg [name=password  ]').val(),
      repassword:$('#form_reg [name=repassword  ]').val()
    }
      $.ajax({
        url:'/api/reg',
        method:'POST',
        data : JSON.stringify(formData),
        contentType:'application/json',
        success:function(res){
          if(res.code !== 0){
            layer.msg(res.message)
          }else{
            layer.msg('注册成功，请登录')
            $('#link_login').click()
          }
        }
      })
    })

    // 监听登录标单的提交事件
    $('#form_login').on('submit',function(e){
      e.preventDefault()
      var  formData =  $(this).serialize()
      var datas = {}
      var arr =  formData.split('&')
      $.each(arr,function(i,item){
        var itemArr =  item.split('=')
        datas[itemArr[0]] = itemArr[1]
      })
      $.ajax({
        url:'/api/login',
        method:'POST',
        data: JSON.stringify(datas),
        contentType:'application/json',
        success:function(res){
          if(res.code !== 0){
            return layer.msg('登录失败')
          }
          localStorage.setItem('token',res.token)
          layer.msg(res.message)
          location.href = '/index.html'
      
        }
      })
    })

})