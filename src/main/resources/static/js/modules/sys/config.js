$(function () {
    initialPage();
    getGrid();
});

function initialPage() {
    $(window).resize(function() {
        $('#dataGrid').bootstrapTable('resetView', {height: $(window).height()-54});
    });
}

function getGrid() {
    $('#dataGrid').bootstrapTableEx({
        url:  baseURL + 'sys/config/list',
        height: $(window).height()-54,
        sidePagination: 'server',
        queryParams: function(params){
            params.username = vm.keyword;
            return params;
        },
        detailView: false,
        detailFormatter: function(index, row) {
            var _html = '<p>ID：'+ row.id +'</p>' +
                '<p>参数名：'+ row.key +'</p>' +
                '<p>参数值：'+ row.value +'</p>' +
                '<p>备注：'+ row.remark +'</p>';
            return _html;
        },
        columns: [{
            checkbox: true
        }, {
            field : "id",
            title : "ID",
            width : "50px"
        }, {
            field : "key",
            title : "参数名",
            width : "200px"
        }, {
            field : "value",
            title : "参数值"
        }, {
            field : "remark",
            title : "备注",
            width : "300px"
        }]
    })
}

var vm = new Vue({
	el:'#rrapp',
	data:{
        keyword: null,
		showList: true,
		title: null,
		config: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.config = {};
		},
		update: function () {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			
			$.get(baseURL + "sys/config/info/"+id, function(r){
                vm.showList = false;
                vm.title = "修改";
                vm.config = r.config;
            });
		},
		del: function (event) {
			var ids = getSelectedRows();
			if(ids == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "sys/config/delete",
                    contentType: "application/json",
				    data: JSON.stringify(ids),
				    success: function(r){
						if(r.code == 0){
							alert('操作成功', function(){
								vm.reload();
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		saveOrUpdate: function () {
			var url = vm.config.id == null ? "sys/config/save" : "sys/config/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.config),
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(){
							vm.reload();
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},
		reload: function () {
			vm.showList = true;
            $('#dataGrid').bootstrapTable('refresh');
		}
	}
});