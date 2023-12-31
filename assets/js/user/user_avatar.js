$(function(){
   // 1.1 获取裁剪区域的 DOM 元素
   var $image = $('#image')
   // 1.2 配置选项
   const options = {
     // 纵横比
     aspectRatio: 1,
     // 指定预览区域
     preview: '.img-preview'
   }
 
   // 1.3 创建裁剪区域
   $image.cropper(options)


  //  监听上传按钮
  $('#changeImageBtn').on('click',function(e){
    console.log(11);
    $('#file').click()
  })

  $('#file').on('change',function(e){
    // 获取上传的图片
    var file = e.target.files[0]
    // 图片转换为url
    var newImgURL = URL.createObjectURL(file)
    // 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域
  })
  $('#uploadImage').on('click',function(){
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

      var data = {
        avatar:dataURL
      }
      $.ajax({
        method:'PATCH',
        url:'/my/update/avatar',
        contentType:'application/json',
        data:JSON.stringify(data),
        success:function(res){
          if(res.code!==0){
            return layui.layer.msg('更换头像失败')
          }
          layui.layer.msg('更好头像成功')
          window.parent.getUserData()
        }
      })
  })
})