define(["jquery","form","cookie"],function($){

	$("#login-form").submit(function(){
        // 不用传数据。自动把有name属性的提交
        $(this).ajaxSubmit({
            url:"/api/login",
            type:"post",
            success:function(data){
                console.log(data);
                $.cookie("userinfo",JSON.stringify(data.result),{path:"/"});
                location.href = "/";
            }

        })

        return false;
    });


})


