<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <%@include file="common/tag.jsp" %>
</head>
<body class="container-fluid">
    <div class="row">
        <div class="col-md-6">
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th colspan="6">公共传入参数</th>
                    </tr>
                    <tr>
                        <th>参数名</th>
                        <th>类型</th>
                        <th>长度</th>
                        <th>备注</th>
                        <th>取值</th>
                        <th>是否必传</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="6">暂无</td>
                    </tr>
                </tbody>
            </table>

            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th colspan="6">私有传入参数</th>
                    </tr>
                    <tr>
                        <th>参数名</th>
                        <th>类型</th>
                        <th>长度</th>
                        <th>备注</th>
                        <th>取值</th>
                        <th>是否必传</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>account</td>
                        <td>String</td>
                        <td></td>
                        <td>商户账户</td>
                        <td></td>
                        <td><font color="red">是</font></td>
                    </tr>
                    <tr>
                        <td>status</td>
                        <td>Integer</td>
                        <td></td>
                        <td>需要修改为的状态</td>
                        <td>1-禁用<br>2-启用</td>
                        <td><font color="red">是</font></td>
                    </tr>
                </tbody>
            </table>

            <table class="table table-bordered table-hover">
                <thead>
                <tr>
                    <th colspan="4">公共返回参数</th>
                </tr>
                <tr>
                    <th>参数名</th>
                    <th>类型</th>
                    <th>备注</th>
                    <th>取值</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>status</td>
                    <td>String</td>
                    <td>状态码</td>
                    <td>200-正常<br>500-系统异常</td>
                </tr>
                <tr>
                    <td>code</td>
                    <td>Integer</td>
                    <td>暂时忽略</td>
                    <td>暂时忽略</td>
                </tr>
                <tr>
                    <td>msg</td>
                    <td>Object</td>
                    <td>数据或者消息</td>
                    <td></td>
                </tr>
                </tbody>
            </table>

            <table class="table table-bordered table-hover">
                <thead>
                <tr>
                    <th colspan="4">私有返回参数</th>
                </tr>
                <tr>
                    <th>参数名</th>
                    <th>类型</th>
                    <th>备注</th>
                    <th>取值</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>code</td>
                    <td>Integer</td>
                    <td>状态码</td>
                    <td>200-正常</td>
                </tr>
                <tr>
                    <td>msg</td>
                    <td>String</td>
                    <td>消息提示</td>
                    <td></td>
                </tr>
                <tr>
                    <td>msg</td>
                    <td>Object</td>
                    <td>数据或者消息</td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="col-md-6">
            <form id="dataForm">
                <div class="form-group">
                    <label for="interface_addr">接口地址</label>
                    <input type="text" class="form-control" id="interface_addr" placeholder="接口地址" value="http://test.source3g.com:90/authority">
                </div>
                <div class="form-group">
                    <label for="call_method">调用方法</label>
                    <input type="text" class="form-control" id="call_method" placeholder="调用方法" value="updateUserStatus">
                </div>
                <div>
                    <p>传入参数：
                        <span class="label label-info"><a href="javascript:paramFormart(1,'param_area');" title="格式化json参数">beautiful</a></span>
                        <span class="label label-success"><a href="javascript:jsonFormart(1,'param_area');" title="去掉json参数空格、回车、换行">small</a></span>
                        <span class="label label-success"><a href="javascript:validateJsonStr('param_area');" title="校验json合法性">right</a></span>
                        <span class="label label-success"><a href="javascript:recoverParam();" title="恢复默认的参数">recover</a></span>
                        <span class="label label-success"><a href="javascript:jsonFormart(3,'param_area');" title="增加转义字符">压缩并转义</a></span>
                        <span class="label label-success"><a href="javascript:jsonFormart(2,'param_area');" title="增加转义字符">转义</a></span>
                        <span class="label label-success"><a href="javascript:jsonFormart(4,'param_area');" title="去掉转义字符">去转义</a></span>
                        <span class="label label-success" id="changeToken_span" style="display: none;" title="修改为登录后的token"><a href="javascript:paramFormart(5,'param_area');">change token</a></span>
                    </p>
                    <textarea id="param_area"  name="param" class="form-control" rows="8">{
    "account":"001",
    "status":"1"
}</textarea>
                </div>
                    <div class="row alert">
                    <div class="col-md-12">
                        <button type="button" class="btn btn-info btn-lg btn-block" >运行</button>
                        <div class="row alert">
                    </div>
                    <br>
                    <div>
                        <p id="reback_data_p">返回参数：
                            <span class="label label-info"><a href="javascript:paramFormart(1,'reback_data');">beautiful</a></span>
                            <span class="label label-success"><a href="javascript:jsonFormart(1,'reback_data');">small</a></span>
                            <span class="label label-success"><a href="javascript:validateJsonStr('reback_data');" title="校验json合法性">right</a></span>
                        </p>
                        <p id="show_data_p"  style="display: none;">
                            <span class="label label-success"><a href="javascript:closeSuperTest();">关闭结果</a></span>
                        </p>
                        <div id="show_data"></div>
                        <textarea id="reback_data" class="form-control" rows="12"></textarea>
                    </div>
            </form>

        </div>
    </div>
</body>
</html>
