<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<%@include file="common/tag.jsp" %>
<title>权限接口测试系统</title>
<body>
<nav class="navbar navbar-inverse navbar-fixed-top">
    <%@include file="common/top.jsp" %>
</nav>

<div class="container-fluid">
    <div class="row">
        <div class="col-md-2 sidebar">
            <%@include file="common/left.jsp" %>
        </div>
        <div class="col-md-10 col-md-offset-2">
            <iframe style="height: 100%; width: 100%;" name="main" src="main.jsp" frameborder="0" scrolling="no" />
        </div>
    </div>
</div>
</body>
</html>
