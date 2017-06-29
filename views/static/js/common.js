define(["jquery","cookie","template"],function($){
	// 侧边栏 头部模板渲染
	// 判断 login 页面的时候不用加载模板
	if(location.pathname != "/dashboard/login"){
		var userinfo = JSON.parse($.cookie("userinfo"));
	    var html = template("profile-tpl",userinfo);
	    $("#userinfo").html(html);
	}   

})

