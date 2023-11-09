$(function(){
  getCatList()
  var openIndex = null
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
})
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