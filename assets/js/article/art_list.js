$(function(){
  var laypage = layui.laypage;
  var layer = layui.layer
  var q = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: ''
  }

  initTable()
  initSelections()


// 初始化表格
  function initTable(){
    $.ajax({
      method:'GET',
      url:'/my/article/list',
      data:q,
      success:function(res){
       var htmlStr =  template('tpl-table',res)
       $('tbody').html(htmlStr)
       renderPage(res.total)
      }
    })
  }


  // 初始化多选框数据
  function initSelections(){
    $.ajax({
        method:'GET',
        url:'/my/cate/list',
        success:function(res){
          if(res.code !==0 ){
            return layui.layer.msg('获取分类数据失败')
          }
          var htmlStr = template('tlp-sel',res)
          $('[name=cate_id]').html(htmlStr)
          layui.form.render()
        }
    })
  }

  // 筛选按钮点击后的处理事情
  $('.layui-form').on('submit',function(e){
    e.preventDefault()
    var id = $('[name=cate_id]').val()
    var state = $('[name=state]').val()
    q.cate_id = id
    q.state = state
    initTable()
  })

  // 格式化时间
  template.defaults.imports.dataFormate = function(date){
    var dt = new Date(date)
    var y = dt.getFullYear()
    var m = addZero(dt.getMonth() + 1)
    var d = addZero(dt.getDay())
    var hh = addZero(dt.getHours())
    var mm = addZero(dt.getMinutes())
    var ss = addZero(dt.getSeconds())
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  }
  // 补零函数
  function addZero(n){
   return  n > 9 ? n : '0' + n
  }

  // 渲染分页
  function renderPage(total){
    laypage.render({
      elem: 'pageBox',
      count: total ,//数据总数，从服务端得到
      layout:['count','limit','prev', 'page', 'next','skip'],
      limit:q.pagesize,
      curr:q.pagenum,
      limits:[2,3,5,10],
      jump: function(obj, first){
        //obj包含了当前分页的所有参数，比如：
      //  console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
       // console.log(obj.limit); //得到每页显示的条数
        q.pagenum = obj.curr
        q.pagesize = obj.limit
        //首次不执行
        if(!first){
          //do something
          initTable()
        }
      }
    });
  }


  // 删除文章
  $('tbody').on('click','.btn-delete',function(){
    var id = $(this).attr('data-id')
    var len = $('.btn-delete').length
    layer.confirm('是否删除?', {icon: 3, title:'提示'}, function(index){
      //do something
      $.ajax({
        method:'DELETE',
        url:'/my/article/info?id=' + id,
        success:function(res){
          if(res.code !==0){
            return layer.msg('删除文章失败！')
          }
          layer.msg('删除文章成功')
          if(len === 1 ){
            q.pagenum = q.pagenum == 1 ? 1 : q.pagenum - 1
          }
          initTable()
        }
      })
      layer.close(index);
    });
  })
})

