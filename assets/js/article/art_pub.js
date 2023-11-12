$(function(){
  var layer = layui.layer
  var form = layui.form

  initCate()
  initEditor()
  // 初始化文章类别
  function initCate(){
    $.ajax({
      method:'GET',
      url:'/my/cate/list',
      success:function(res){
        if(res.code !== 0 ){
          return layer.msg('初始化文章类别失败！')
        }
        var htmlStr = template('tpl-cate',res)
        $('[name=cate_id]').html(htmlStr)
        form.render()
      }

    })
  }

  // 封面渲染
    // 1. 初始化图片裁剪器
    var $image = $('#image')
  
    // 2. 裁剪选项
    var options = {
      aspectRatio: 400 / 280,
      preview: '.img-preview'
    }
    
    // 3. 初始化裁剪区域
    $image.cropper(options)


    // 选择封面按钮，选择图片
    $('#chooseImage').on('click',function(){
      $('#coveFile').click()
    })


    // 监听上传文件变化,改变封面图片
    $('#coveFile').on('change',function(e){
      var file = e.target.files[0]
      console.log(typeof file);
      if(file.length == 0){
        return
      }
      var newImgURL = URL.createObjectURL(file)
      $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域
    })

    var state = '已发布'
    // 监听点击了草稿按钮
    $('#btnSave2').on('click',function(){
      state = '草稿'
    })

    $('#form-pub').on('submit',function(e){
      e.preventDefault()
      var fd = new FormData($(this)[0])
      fd.append('state',state)
      $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 400,
        height: 280
      })
      .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        fd.append('cover_img',blob)
        publishArticle(fd)
      })


    })
    function publishArticle(fd){
      $.ajax({
        method:'POST',
        url:'/my/article/add',
        contentType:false,
        processData: false,
        data:fd,
        success:function(res){
          if(res.code !== 0){
            return layer.msg('发布文章失败！')
          }
          layer.msg('发布文章成功')
          location.href = '/article/art_list.html'
        }


      })
    }
})