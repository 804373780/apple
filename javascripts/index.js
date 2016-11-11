$(function(){
    /*轮播图*/
    var currentNum=0;
    var nextNum=0;
    var currentTime=0;
    var flag=true;


    function move(){
        nextNum++;
        if(nextNum>=$(".banner_img>a").length){
            nextNum=0;
            flag=false;
        }
        $(".banner_img>a").eq(currentNum).animate({width:"80%",height:"80%"}).css("zIndex",0);
        $(".banner_img>a").eq(nextNum).animate({left:0},function(){
            $(".banner_img>a").eq(currentNum).css({left:"100%",width:"100%",height:"100%"})
            currentNum=nextNum;
            currentTime=0;
            flag=true;
        }).css("zIndex",1)
    }
    /*进度条*/
    function p_move(){
        currentTime+=100;
        var jindu=currentTime/3000;
        if(jindu>1){
            jindu=1;
        }
        $(".progess").eq(currentNum).css({"width":jindu*100+"%"});
        if(flag===false){
            $(".progess").css({width:"0"});
        }
    }

    $(".tabcard").click(function(){
        nextNum=$(this).index();
        stop();
    })
    $(".left_btn").click(function(){
        nextNum++;
        if(nextNum==$(".banner_img>a").length){
            nextNum=0;
        }
        stop();
    })
    $(".right_btn").click(function(){
         nextNum--;
        if(nextNum==-1){
            nextNum=$(".banner_img>a").length-1;
        }
         stop();
    })

    /*停止器*/
    function stop(){
    /*暂停定时器*/
    clearInterval(t);
    clearInterval(pt);
    /*检测改变*/
        $(".tabcard").find(".progess").css("width",0);
        $(".tabcard").eq(nextNum).find(".progess").css("width","100%");
        if(nextNum>currentNum){
            $(".banner_img>a").eq(currentNum).animate({width:"80%",height:"80%"}).css("zIndex",0);
            $(".banner_img>a").eq(nextNum).animate({left:0},function(){
                $(".banner_img>a").eq(currentNum).css({left:"100%",width:"100%",height:"100%"})
                currentNum=nextNum;
            }).css("zIndex",1)
        }else if(nextNum<currentNum){
            $(".banner_img>a").eq(currentNum).animate({left:"100%"}).css("zIndex",1);
            $(".banner_img>a").eq(nextNum).css({left:"0",width: "80%", height: "80%"}).animate({width: "100%", height: "100%"},function(){
                currentNum = nextNum;
            }).css("zIndex",0);
        }
   }

    var t=setInterval(move,3000);
    var pt=setInterval(p_move,100);

    $("window").blur(function(){
        clearInterval(t);
        clearInterval(pt);
    })
    $("window").focus(function(){
        t=setInterval(move,3000);
        pt=setInterval(p_move,100);
    })
    $(".pointer_open").on("click",function(){
        $(".small_nav").slideDown(1000);
        $(".nav").hide();
        $(".banner").hide();
        $(".list").hide();
        $(".footer").hide();
    })
    $(".pointer_close").on("click",function(){
        $(".small_nav").slideUp(1000);
        $(".nav").show();
        $(".banner").show();
        $(".list").show();
        $(".footer").show();
    })
    $(".inner-list-item-title").click(function(){
        $(this).next("ul").toggle(500);
    })
})