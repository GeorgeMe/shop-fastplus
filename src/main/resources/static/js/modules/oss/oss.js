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
        url:  baseURL + 'sys/oss/list',
        height: $(window).height()-54,
        sidePagination: 'server',
        queryParams: function(params){
            params.username = vm.keyword;
            return params;
        },
        detailView: false,
        detailFormatter: function(index, row) {
            var _html = '<p>操作用户ID：'+ row.id +'</p>' +
                '<p>执行方法：'+ row.url +'</p>' +
                '<p>请求参数：'+ row.createDate +'</p>';
            return _html;
        },
        columns: [{
            checkbox: true
        }, {
            field : "id",
            title : "ID",
            width : "50px"
        }, {
            field : "url",
            title : "URL地址",
            width : "150px"
        }, {
            field : "createDate",
            title : "创建时间",
            width : "200px"
        }]
    });

    new AjaxUpload('#upload', {
        action: baseURL + 'sys/oss/upload?token=' + token,
        name: 'file',
        autoSubmit:true,
        responseType:"json",
        onSubmit:function(file, extension){
            if(vm.config.type == null){
                alert("云存储配置未配置");
                return false;
            }
            if (!(extension && /^(jpg|jpeg|png|gif)$/.test(extension.toLowerCase()))){
                alert('只支持jpg、png、gif格式的图片！');
                return false;
            }
        },
        onComplete : function(file, r){
            if(r.code == 0){
                alert(r.url);
                vm.reload();
            }else{
                alert(r.msg);
            }
        }
    });
}

var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null,
        config: {}
	},
    created: function(){
        this.getConfig();
    },
	methods: {
		query: function () {
			vm.reload();
		},
		getConfig: function () {
            $.getJSON(baseURL + "sys/oss/config", function(r){
				vm.config = r.config;
            });
        },
		addConfig: function(){
			vm.showList = false;
			vm.title = "云存储配置";
		},
		saveOrUpdate: function () {
			var url = baseURL + "sys/oss/saveConfig";
			$.ajax({
				type: "POST",
			    url: url,
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
        del: function () {
            var ossIds = getSelectedRows();
            if(ossIds == null){
                return ;
            }

            confirm('确定要删除选中的记录？', function(){
                $.ajax({
                    type: "POST",
                    url: baseURL + "sys/oss/delete",
                    contentType: "application/json",
                    data: JSON.stringify(ossIds),
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
            });
        },
		reload: function () {
			vm.showList = true;
            $('#dataGrid').bootstrapTable('refresh');
		}
	}
});