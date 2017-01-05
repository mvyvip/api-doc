var basePath = "/platformTest";
//var basePath = "";

/**普通测试*/
function test() {
	$("#show_data").hide();
	$("#show_data_p").hide();
	$("#reback_data").show();
	$("#reback_data_p").show();
	var callUrl = $("input[name='callUrl']").val();
	var callFunction = $("input[name='callFunction']").val();
	var param = $("textarea[name='param']").val();
	if(callUrl && callFunction && param){
		var params = $("#saveObjForm").serialize();
		params += "&type=1";
		jQuery.post(basePath + "/test", params, function(data) {
			jQuery("#reback_data").val(data);
		});
	}else{
		alert("测试参数不完整");
	}
}
/**用户登录*/
function login() {
		var params = $("#saveObjForm").serialize();
		jQuery.post(basePath + "/login", params, function(data) {
			$("#login_form_div").hide();
			$("#login_result_show").show();
			$("#login_result_show").html(data);
		});
}

/**退出登录*/
function logout(){
		jQuery.post(basePath + "/validateJson", {type:4}, function(data) {
			if("true" == data){
				window.location.reload();
			}
		});
}

/**循环测试*/
function superTest() {
	$("#reback_data").hide();
	$("#reback_data_p").hide();
	$("#show_data").show();
	$("#show_data_p").show();
	var callUrl = $("input[name='callUrl']").val();
	var callFunction = $("input[name='callFunction']").val();
	var param = $("textarea[name='param']").val();
	if(callUrl && callFunction && param){
		var params = $("#saveObjForm").serialize();
		params += "&type=2";
		jQuery.post(basePath + "/test", params, function(data) {
			$("#show_data").html(data);
		});
	}else{
		alert("测试参数不完整");
	}
}

/**关闭superTest结果的显示*/
function closeSuperTest(){
	$("#show_data").hide();
	$("#show_data_p").hide();
	$("#reback_data").show();
	$("#reback_data_p").show();
}

/**校验json是否合法*/
function validate(){
	var param = $("textarea[name='param']").val();
	if(param){
		var params = $("#saveObjForm").serialize();
		params += "&type=1";
		jQuery.post(basePath + "/validateJson", params, function(data) {
			jQuery("#reback_data").val(data);
		});
	}else{
		alert("请填写需要验证的json字符串");
	}
}

/**格式化json*/
function formart(type){
	var param = $("textarea[name='param']").val();
	if(param && type){
		var params = $("#saveObjForm").serialize();
		params += "&type="+type;
		jQuery.post(basePath + "/formartJson", params, function(data) {
			jQuery("#reback_data").val(data);
		});
	}else{
		alert("请填写需要格式化的json字符串");
	}
}

/**按区域格式化json*/
function paramFormart(type,areaId){
	var param = $("#"+areaId+"").val();
	if(param){
		param = "param="+param + "&type=" + type;
		//替换version apptype
		if(type == 6){
			var apptype = $("#app_type_select").val();
			var version = $("#api_version_select").val();
			param += "&apptype="+apptype + "&version=" + version;
		}
		$.post(basePath + "/formartJson", param, function(data) {
			$("#"+areaId+"").val(data);
		});
	}
	//替换token
	if(type == 5){
		$("#change_token_tip").show();
		setTimeout(function(){
			$("#change_token_tip").hide();
		},3000);
	}
}

/**校验json是否合法*/
function validateJsonStr(areaId){
	$("#validate_"+areaId+"_success").hide();
	$("#validate_"+areaId+"_error").hide();
	var param = $("#"+areaId+"").val();
	if(param){
		param = "param="+param + "&type=1";
		$.post(basePath + "/validateJson", param, function(data) {
			if(data == "true"){
				$("#validate_"+areaId+"_success").show();
			}else{
				$("#validate_"+areaId+"_error").show();
			}
		});
	}
}

/**param是否包含token*/
function hasToken(){
	$("#changeToken_span").hide();
	var param = $("textarea[name='param']").val();
	if(param){
		var params = $("#saveObjForm").serialize();
		params += "&type=2";
		jQuery.post(basePath + "/validateJson", params, function(data) {
			if("true" == data){
				isLogin();
			}
		});
	}
}

/**检查用户是否登录*/
function isLogin(){
	$("#changeToken_span").hide();
	$("#not_login_tip").hide();
	var param = $("textarea[name='param']").val();
	if(param){
		var params = $("#saveObjForm").serialize();
		params += "&type=3";
		jQuery.post(basePath + "/validateJson", params, function(data) {
			if("true" == data){
				$("#changeToken_span").show();
				paramFormart(5,'param_area');
			}else{
				$("#not_login_tip").show();
			}
		});
	}
}

/**版本和app select选择事件*/
function updateVersionAndApp(){
	/*var app_type_select = $("#app_type_select").val();
	if(app_type_select == 16){
		$("#api_version_select").val("v1.0");
	}else if(app_type_select == 2){
		$("#api_version_select").val("v2.0.0");
	}else{
		$("#api_version_select").val("v2.1.0");
	}*/
	//初始化api版本和app
	paramFormart(6,'param_area');
}

/**左侧菜单点击事件*/
function openPage(page) {
	var url = window.location.href;
	if(url.indexOf('common') > 0){
		url = url.substring(0,url.indexOf('common'));
		window.location.href = url + page + ".jsp?page="+page;
	}else{
		window.location.href = page + ".jsp?page="+page;
	}
}

/**恢复默认的参数*/
function recoverParam(){
	var param = $("#param_area_backup").val();
	$("#param_area").val(param);
}

/**页面初始化javascript*/
jQuery(document).ready(function() {
	setTimeout(function(){hasToken();},1000);
	//初始化api版本和app
	paramFormart(6,'param_area');
	//自动定位到点击的菜单
	setTimeout(function(){
		window.location.hash = "#actived_link";
		},200);
});

var scroll_y = parseInt(1000); 
window.scrollBy(0, scroll_y); 

function removeNavClass() {
	jQuery(".nav li").each(function(obj) {
		$(this).removeClass("active");
	});
}

/*
1 压缩
2 转义
3 压缩转义
4 去除转义
*/
function jsonFormart(ii,areaId){
var txtA = document.getElementById(""+areaId+"");
var text = txtA.value;
if(ii==1||ii==3){
text = text.split("\n").join(" ");
var t = [];
var inString = false;
for (var i = 0, len = text.length; i < len; i++) {
var c = text.charAt(i);
if (inString && c === inString) {
// TODO: \\"
if (text.charAt(i - 1) !== '\\') {
inString = false;
}
} else if (!inString && (c === '"' || c === "'")) {
inString = c;
} else if (!inString && (c === ' ' || c === "\t")) {
c = '';
}
t.push(c);
}
text= t.join('');
}
if(ii==2||ii==3){
text = text.replace(/\\/g,"\\\\").replace(/\"/g,"\\\"");
}
if(ii==4){
text = text.replace(/\\\\/g,"\\").replace(/\\\"/g,'\"');
}
txtA.value = text;
}