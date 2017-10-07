/**

 * 系统日志js

 */

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
        url:  baseURL + 'sys/log/list',
        height: $(window).height()-54,
        sidePagination: 'server',
        queryParams: function(params){
            params.username = vm.keyword;
            return params;
        },
        detailView: false,
        detailFormatter: function(index, row) {
            var _html = '<p>操作用户：'+ row.username +'</p>' +
                '<p>执行方法：'+ row.method +'</p>' +
                '<p>请求参数：'+ row.params +'</p>';
            return _html;
        },
        columns: [{
            checkbox: true
        }, {
            field : "id",
            title : "编号",
            width : "50px"
        }, {
            field : "username",
            title : "用户名",
            width : "150px"
        }, {
            field : "operation",
            title : "操作",
            width : "200px"
        }, {
            field : "time",
            title : "响应时间(ms)",
            width : "130px"
        }, {
            field : "ip",
            title : "IP地址",
            width : "130px"
        },  {
            field : "createDate",
            title : "创建时间"
        }]
    })
}

var vm = new Vue({
    el:'#rrapp',
    data: {
        keyword: null
    },
    methods : {
        query: function() {
            $('#dataGrid').bootstrapTable('refresh');
        },
        remove: function() {

        },
        clear: function() {

        }
    }
})