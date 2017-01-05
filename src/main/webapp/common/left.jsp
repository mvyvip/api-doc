<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript">
    $(function() {
        $("a").click(function () {
            $("li").removeClass("active");
            $(this).parent().addClass("active");
        })
    })
</script>

<ul class="nav nav-sidebar">
    <li class="alert-danger">
        <h3><span class="label label-info">子系统交互API</span></h3>
    </li>
    <li><a href="${pageContext.request.contextPath }/test2.jsp" target="main">启用/禁用帐号</a></li>
    <li><a href="${pageContext.request.contextPath }/test2.jsp" target="main">根据帐号修改商户名称</a></li>

</ul>