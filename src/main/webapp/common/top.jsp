<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<div class="container-fluid">
  <div class="navbar-header">
    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
      <span class="sr-only">Toggle navigation</span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>
    <a class="navbar-brand" href="${pageContext.request.contextPath }/">权限接口测试</a>
  </div>
  <div id="navbar" class="navbar-collapse collapse">
    <ul class="nav navbar-nav navbar-left">
      <li><c:if test="${login_token != null }"><a>登录token：${login_token}</a></c:if></li>
    </ul>
    <ul class="nav navbar-nav navbar-right">
     <%-- <li><a href="${pageContext.request.contextPath }/common/userloginuser.jsp" target="main">用户登录</a></li>
      <li><a href="${pageContext.request.contextPath }/common/validateJson.jsp" target="main">验证json</a></li>
      <li><a href="${pageContext.request.contextPath }/common/formartJson.jsp" target="main">格式化json</a></li>--%>
    </ul>
  </div>
</div>