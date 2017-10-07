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
        url:  baseURL + 'sys/scheduleLog/list',
        height: $(window).height()-54,
        sidePagination: 'server',
        queryParams: function(params){
            params.username = vm.keyword;
            return params;
        },
        detailView: false,
        detailFormatter: function(index, row) {
            var _html = '<p>日志ID：'+ row.logId +'</p>' +
                '<p>任务ID：'+ row.jobId +'</p>' +
                '<p>bean名称：'+ row.beanName +'</p>' +
                '<p>方法名称：'+ row.methodName +'</p>' +
                '<p>参数：'+ row.params +'</p>' +
                '<p>执行时间：'+ row.createTime +'</p>' +
                '<p>耗时(单位：毫秒)：'+ row.times +'</p>' +
                '<p>status：'+ row.status +'</p>';
            return _html;
        },
        columns: [{
            checkbox: true
        }, {
            field : "logId",
            title : "日志ID",
            width : "50px"
        }, {
            field : "jobId",
            title : "任务ID",
            width : "150px"
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
        } ,{
            field : "createTime",
            title : "执行时间",
            width : "150px"
        }, {
            field : "times",
            title : "耗时(单位：毫秒)",
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
			jobId: null
		}
	},
	methods: {
		query: function () {
			$("#jqGrid").jqGrid('setGridParam',{ 
                postData:{'jobId': vm.q.jobId},
                page:1 
            }).trigger("reloadGrid");
		},
		showError: function(logId) {
			$.get(baseURL + "sys/scheduleLog/info/"+logId, function(r){
				parent.layer.open({
				  title:'失败信息',
				  closeBtn:0,
				  content: r.log.error
				});
			});
		},
		back: function () {
			history.go(-1);
		}
	}
});

