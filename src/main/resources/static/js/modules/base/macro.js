/**
 * 通用字典js
 */

$(function () {
    initialPage();
    getGrid();
});

function initialPage() {
    $(window).resize(function() {
        TreeGrid.table.resetHeight({height: $(window).height()-100});
    });
}

function getGrid() {
    var colunms = TreeGrid.initColumn();
    var table = new TreeTable(TreeGrid.id, baseURL + 'sys/macro/list?_' + $.now(), colunms);
    table.setExpandColumn(2);
    table.setIdField("macroId");
    table.setCodeField("macroId");
    table.setParentCodeField("typeId");
    table.setExpandAll(false);
    table.setHeight($(window).height()-100);
    table.init();
    TreeGrid.table = table;
}
var TreeGrid = {
    id: "dataGrid",
    table: null,
    layerIndex: -1
};
/**
 * 初始化表格的列
 */
TreeGrid.initColumn = function () {
    var columns = [
        {field: 'selectItem', radio: true},
        {title: '编号', field: 'macroId', visible: false, align: 'center', valign: 'middle', width: '50px'},
        {title: '参数名', field: 'name', align: 'center', valign: 'middle', width: '180px'},
        {title: '参数值', field: 'value', align: 'center', valign: 'middle', width: '180px'},
        {title: '所属类别', field: 'typeName', align: 'center', valign: 'middle', width: '100px'},
        {title: '类型', field: 'type', align: 'center', valign: 'middle', width: '60px', formatter: function(item, index){
            if(item.type === 0){
                return '<span class="label label-primary">目录</span>';
            }
            if(item.type === 1){
                return '<span class="label label-warning">参数</span>';
            }
        }},
        {title: '排序', field: 'orderNum', align: 'center', valign: 'middle', width: '50px'},
        {title: '可用', field: 'status', align: 'center', valign: 'middle', width: '60px', formatter: function(item, index){
            if(item.status === 0){
                return '<i class="fa fa-toggle-off"></i>';
            }
            if(item.status === 1){
                return '<i class="fa fa-toggle-on"></i>';
            }
        }},
        {title: '备注', field: 'remark', align: 'left', valign: 'middle'}
    ]
    return columns;
};
var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null,
		sysMacro: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.sysMacro = {};
		},
		update: function (event) {
			var macroId = getSelectedRow();
			if(macroId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(macroId)
		},
		saveOrUpdate: function (event) {
			var url = vm.sysMacro.macroId == null ? "sys/macro/save" : "sys/macro/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.sysMacro),
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
			var macroIds = getSelectedRows();
			if(macroIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "sys/macro/delete",
                    contentType: "application/json",
				    data: JSON.stringify(macroIds),
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
		getInfo: function(macroId){
			$.get(baseURL + "base/macro/info/"+macroId, function(r){
                vm.sysMacro = r.sysMacro;
            });
		},
		reload: function (event) {
			vm.showList = true;
            $('#dataGrid').bootstrapTable('refresh');
		}
	}
});