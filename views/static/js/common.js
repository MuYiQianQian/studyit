define(["jquery","template","nprogress","cookie"],function($,template,NProgress){

	// 页面加载时 进度条
	NProgress.start();
	NProgress.done();

	// 发送ajax请求 开始 结束时 触动进度条
	$(document).ajaxStart(function(){
		NProgress.start();
	});
	$(document).ajaxStop(function(){
		NProgress.done();
	});
	


	// 入口函数
	$(function(){
		
		// 判断 login 页面的时候  不用加载模板
		if(location.pathname != "/dashboard/login"){
			// 判断用户是否处于登录状态，不是就跳转到登录页面
			if(!$.cookie("PHPSESSID")){
				location.href = "/dashboard/login";
			}else{
				// 登录状态下 侧边栏 头部模板渲染
				var userinfo = JSON.parse($.cookie("userinfo"));
			    var html = template("profile-tpl",userinfo);
			    $("#userinfo").html(html);
			}
		};


		//退出登录的功能
		$("#logout").click(function(){
			$.ajax({
				url : "/api/logout",
				type : "post",
				success : function(data){
					if(data.code == 200){
						location.href = "/dashboard/login";
					}
				}
			})
		})


		//导航栏 添加点击背景 变暗事件
		$(".navs>ul>li").click(function(){
			$(this).children("a").addClass("active");
			$(this).siblings("li").children("a").removeClass("active");
		});


		//当前页面对应导航栏 变暗事件
		$(".navs a").each(function(i,v){
			if($(v).attr("href") == location.pathname){
				$(v).addClass("active");
				// 二级菜单中的a  显示出来
				$(v).parent("li").parent("ul").slideDown();
			}
		});


		// 导航栏二级菜单显示事件
		$(".navs>ul>li>ul").parent().click(function(){
			//显示二级菜单
			var $ul = $(this).children("ul");
			$ul.slideToggle();

			//找二级菜单下的a标签如果有选中的就把当前li的active给取消掉
			if($ul.find("a.active").length > 0){
				$(this).children("a").removeClass("active");
			}
		})

	});

})

