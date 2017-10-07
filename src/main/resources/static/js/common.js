$.fn.bootstrapTableEx = function(opt){
    var defaults = {
        url: '',
        method: 'post',
        dataType: 'json',
        selectItemName: 'id',
        clickToSelect: true,
        pagination: true,
        smartDisplay: false,
        pageSize: 10,
        pageList: [10, 20, 30, 40, 50],
        paginationPreText: '上一页',
        paginationNextText: '下一页',
        sidePagination: 'server',
        queryParamsType : null,
        columns: []
    }
    var option = $.extend({}, defaults, opt);
    $(this).bootstrapTable(option);
}


//工具集合Tools
window.T = {};

// 获取请求参数
// 使用示例
// location.href = http://localhost/index.html?id=123
// T.p('id') --> 123;
var url = function(name) {
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return  unescape(r[2]); return null;
};
T.p = url;

//请求前缀
var baseURL = "/shop-fastplus/";

//登录token
var token = localStorage.getItem("token");
if(token == 'null'){
    parent.location.href = baseURL + 'login.html';
}

//jquery全局配置
$.ajaxSetup({
	dataType: "json",
	cache: false,
    headers: {
        "token": token
    },
    // xhrFields: {
    //     withCredentials: true
    // },
    complete: function(xhr) {
        //token过期，则跳转到登录页面
        if(xhr.responseJSON.code == 401){
            parent.location.href = baseURL + 'login.html';
        }
    }
});

//权限判断
function hasPermission(permission) {
/*    if (window.parent.permissions.indexOf(permission) > -1) {
        return true;
    } else {
        return false;
    }*/
return true;
}
reload = function () {
    location.reload();
    return false;
}
//重写alert
window.alert = function(msg, callback){
	parent.layer.alert(msg, function(index){
		parent.layer.close(index);
		if(typeof(callback) === "function"){
			callback("ok");
		}
	});
}

//重写confirm式样框
window.confirm = function(msg, callback){
	parent.layer.confirm(msg, {btn: ['确定','取消']},
	function(){//确定事件
		if(typeof(callback) === "function"){
			callback("ok");
		}
	});
}

//选择一条记录
function getSelectedRow() {
    var selected = $('#dataGrid').bootstrapTreeTable('getSelections');
    if (selected.length >1||selected.length <0) {
        alert("请选择一条记录");
        return false;
    } else {
        console.log("common-1:"+JSON.stringify(selected[0]));
        return selected[0];
    }
}

//选择多条记录
function getSelectedRows() {
    var selected = $('#dataGrid').bootstrapTreeTable('getSelections');
    if (selected.length <1 ) {
        alert("请至少选择一条记录");
        return false;
    } else {
        console.log("common-n:"+JSON.stringify(selected[0]));
        return selected;
    }
}


dialogOpen = function(opt){
    var defaults = {
        id : 'layerForm',
        title : '',
        width: '',
        height: '',
        url : null,
        scroll : false,
        data : {},
        btn: ['确定', '取消'],
        success: function(){},
        yes: function(){}
    }
    var option = $.extend({}, defaults, opt), content = null;
    if(option.scroll){
        content = [option.url]
    }else{
        content = [option.url, 'no']
    }
    top.layer.open({
        type : 2,
        id : option.id,
        title : option.title,
        closeBtn : 1,
        anim: -1,
        isOutAnim: false,
        shadeClose : false,
        shade : 0.3,
        area : [option.width, option.height],
        content : content,
        btn: option.btn,
        success: function(){
            option.success(option.id);
        },
        yes: function(){
            option.yes(option.id);
        }
    });
}

dialogClose = function() {
    var index = top.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
    top.layer.close(index); //再执行关闭
}

