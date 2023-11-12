$(function(){
  getCatList()
  var openIndex = null
  var form = layui.form
  $('#addCateBtn').on('click',function(){
    openIndex = layer.open({
      type:1,
      area:['500px','300px'],
      title: '添加文章分类',
      content: $('#add_dialog').html()
    });  
  })
  $('body').on('submit','#addForm',function(e){
    e.preventDefault()
    
    // 表单数据变为对象
    var obj = {}
    var formData =  decodeURI($('#addForm').serialize()) 
    console.log(formData);
    var arr = formData.split('&')
    $.each(arr,function(i,item){
      newItem = item.split('=')
      obj[newItem[0]] = newItem[1]
    })


    $.ajax({
      method:'POST',
      url:'/my/cate/add',
      contentType:'application/json',
      data:JSON.stringify(obj),
      success:function(res){
        if(res.code !== 0 ){
          return layui.layer.msg('添加类别失败')
        }
        layui.layer.msg('添加类别成功')
        layer.close(openIndex)
        getCatList()
      }
    })
  })

  var editIndex = null
  // 给每个编辑按钮设置点击事件
  $('tbody').on('click','.editBtn',function(){
    var id = $(this).attr('data_id')
    editIndex = layer.open({
      type:1,
      area:['500px','300px'],
      title: '修改文章分类',
      content: $('#edit_dialog').html()
    });  
    $.ajax({
      method:'GET',
      url:'/my/cate/info?id=' + id,
      success:function(res){
        form.val('editForm',res.data)
      }
    })
  })

  // 代理，点击修改按钮，发起请求修改
  $('body').on('submit','#editForm',function(e){
    var formData= form.val('editForm')
    console.log();
    e.preventDefault()
    $.ajax({
      method:'PUT',
      url:'/my/cate/info',
      contentType:'application/json',
      data:JSON.stringify(formData),
      success:function(res){
        if(res.code !== 0 ){
          return layui.layer.msg('修改失败')
        }
        layui.layer.msg('修改成功')
        layui.layer.close(editIndex)
        getCatList()
      }
    })
  })


  // 通过代理，点击删除按钮
  $('tbody').on('click','.deleteBtn',function(){
    var id = $(this).attr('data_id')
    $.ajax({
      method:'DELETE',
      url:'/my/cate/del?id=' + id,
      success:function(res){
        if(res.code !== 0){
          return layui.layer.msg('删除失败')
        }
        layui.layer.msg('删除成功')
        getCatList()
      }
    })
  })

})

// 获取文章列表
function getCatList(){
  $.ajax({
    mehord:'GET',
    url:'/my/cate/list',
    success:function(res){
      if(res.code !== 0){
        return layui.layer.msg('获取文章列表失败')
      }
      var htmlStr = template('tpl_articleTable',res)
      $('tbody').html(htmlStr)
    }
  })


}