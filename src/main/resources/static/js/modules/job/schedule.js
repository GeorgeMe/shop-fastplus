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
        url:  baseURL + 'sys/schedule/list',
        height: $(window).height()-54,
        sidePagination: 'server',
        queryParams: function(params){
            params.username = vm.keyword;
            return params;
        },
        detailView: false,
        detailFormatter: function(index, row) {
            var _html = '<p>任务ID：'+ row.jobId +'</p>' +
                '<p>bean名称：'+ row.beanName +'</p>' +
                '<p>方法名称：'+ row.methodName +'</p>' +
                '<p>参数：'+ row.params +'</p>' +
                '<p>cron表达式：'+ row.cronExpression +'</p>' +
                '<p>备注：'+ row.remark +'</p>' +
                '<p>请求参数：'+ row.status +'</p>';
            return _html;
        },
        columns: [{
            checkbox: true
        }, {
            field : "jobId",
            title : "任务ID",
            width : "50px"
        }, {
            field : "beanName",
            title : "bean名称",
            width : "150px"
        }, {
            field : "methodName",
            title : "方法名称",
            width : "150px"
        }, {
            field : "params",
            title : "参数",
            width : "150px"
        }, {
            field : "cronExpression",
            title : "cron表达式",
            width : "150px"
        }, {
            field : "remark",
            title : "备注",
            width : "150px"
        }, {
            field : "status",
            title : "状态",
            width : "200px",
            formatter : function(value, row, index) {
/*                return value === 0 ?
                    '<span class="label label-success">正常</span>' :
                    '<span class="label label-danger">暂停</span>';*/
                if (value == '0') {
                    return '<span class="label label-danger">禁用</span>';
                } else if (value == '1') {
                    return '<span class="label label-success">正常</span>';
                }
            }
        }]
    })
}

var vm = new Vue({
	el:'#rrapp',
	data:{
		q:{
			beanName: null
		},
		showList: true,
		title: null,
		schedule: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.schedule = {};
		},
		update: function () {
			var jobId = getSelectedRow();
			if(jobId == null){
				return ;
			}
			
			$.get(baseURL + "sys/schedule/info/"+jobId, function(r){
				vm.showList = false;
                vm.title = "修改";
				vm.schedule = r.schedule;
			});
		},
		saveOrUpdate: function (event) {
			var url = vm.schedule.jobId == null ? "sys/schedule/save" : "sys/schedule/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.schedule),
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
			var jobIds = getSelectedRows();
			if(jobIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "sys/schedule/delete",
                    contentType: "application/json",
				    data: JSON.stringify(jobIds),
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
		pause: function () {
			var jobIds = getSelectedRows();
			if(jobIds == null){
				return ;
			}
			
			confirm('确定要暂停选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "sys/schedule/pause",
                    contentType: "application/json",
				    data: JSON.stringify(jobIds),
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
		resume: function () {
			var jobIds = getSelectedRows();
			if(jobIds == null){
				return ;
			}
			
			confirm('确定要恢复选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "sys/schedule/resume",
                    contentType: "application/json",
				    data: JSON.stringify(jobIds),
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
		runOnce: function () {
			var jobIds = getSelectedRows();
			if(jobIds == null){
				return ;
			}
			
			confirm('确定要立即执行选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "sys/schedule/run",
                    contentType: "application/json",
				    data: JSON.stringify(jobIds),
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
		reload: function (event) {
			vm.showList = true;
            $('#dataGrid').bootstrapTable('refresh');
		}
	}
});