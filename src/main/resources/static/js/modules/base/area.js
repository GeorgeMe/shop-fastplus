/**
 * 行政区域js
 */

$(function() {
    initialPage();
    getGrid();
});

function initialPage() {
    $("#treePanel").css('height', $(window).height()-54);
    $(window).resize(function() {
        $("#treePanel").css('height', $(window).height()-54);
        $('#dataGrid').bootstrapTable('resetView', {
            height : $(window).height() - 108
        });
    });
}

function getGrid() {
    $('#dataGrid').bootstrapTableEx({
        url : baseURL + 'sys/area/list?_' + $.now(),
        height : $(window).height() - 108,
        queryParams : function(params) {
            params.name = vm.keyword;
            params.parentCode = vm.parentCode;
            return params;
        },
        pagination : false,
        columns : [ {
            checkbox : true
        }, {
            field : "areaId",
            title : "编号",
            width : "50px"
        }, {
            field : "areaCode",
            title : "区域代码",
            width : "100px"
        }, {
            field : "name",
            title : "区域名称",
            width : "200px"
        }, {
            field : "layer",
            title : "层级",
            width : "60px",
            formatter : function(value, row, index) {
                if (value == 1) {
                    return '<span class="label label-primary">省级</span>';
                }
                if (value == 2) {
                    return '<span class="label label-success">地市</span>';
                }
                if (value == 3) {
                    return '<span class="label label-warning">区县</span>';
                }
            }
        }, {
            field : "orderNum",
            title : "排序",
            width : "60px",
            align : "center",
        }, {
            field : "status",
            title : "可用",
            width : "60px",
            align : "center",
            formatter : function(value, row, index) {
                if (value == 0) {
                    return '<i class="fa fa-toggle-off"></i>';
                }
                if (value == 1) {
                    return '<i class="fa fa-toggle-on"></i>';
                }
            }
        }, {
            field : "remark",
            title : "备注"
        } ]
    })
}

var setting = {
    async : {
        enable: true,
        type: "get",
        url: baseURL + "sys/area/select",
        autoParam: ["areaCode"]
    },
    data : {
        simpleData : {
            enable : true,
            idKey : "areaCode",
            pIdKey : "parentCode",
            rootPId : "0"
        },
        key : {
            url : "nourl"
        }
    },
    callback : {//左边树形点击加载
        onClick : function(event, treeId, treeNode) {
            vm.parentCode = treeNode.areaCode;
            vm.parentName = treeNode.name;
            vm.query();
        }
    }
};
var ztree;

var vm = new Vue({
	el:'#rrapp',
	data:{
        keyword : null,
        parentCode : '0',
        parentName : null,
		showList: true,
		title: null,
		sysArea: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
        getArea : function(parentCode) {
            $.get(baseURL + 'sys/area/select', {areaCode: parentCode},function(r) {
                console.log("============================")
                ztree = $.fn.zTree.init($("#areaTree"), setting, r);
            })
        },
        save: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.sysArea = {};
		},
		update: function (event) {
			var areaId = getSelectedRow();
			if(areaId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(areaId)
		},
		saveOrUpdate: function (event) {
			var url = vm.sysArea.areaId == null ? "sys/area/save" : "sys/area/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.sysArea),
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(index){
							vm.reload();
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},
		del: function (event) {
			var areaIds = getSelectedRows();
			if(areaIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "sys/area/delete",
                    contentType: "application/json",
				    data: JSON.stringify(areaIds),
				    success: function(r){
						if(r.code == 0){
							alert('操作成功', function(index){
								$("#jqGrid").trigger("reloadGrid");
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		getInfo: function(areaId){
			$.get(baseURL + "sys/area/info/"+areaId, function(r){
                vm.sysArea = r.sysArea;
            });
		},
		reload: function (event) {
			vm.showList = true;
            $('#dataGrid').bootstrapTable('refresh');
		}
	},
    created : function() {//vue创建完成执行的方法
        this.getArea(this.parentCode);
    }
});