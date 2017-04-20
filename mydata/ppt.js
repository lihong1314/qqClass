     
        var svgarr={};
        var backarr={};
        //画板功能
    	$('<div id="svgbox">'+ 
	        '<ul class="btnbox">'+  
	                '<li id="rect"><div class="iconfont icon-xuxianxuankuang"></div>'+
                        '<div class="shezhi"><ul class="lineWidth"><li class="lineWidth-active"><span class="onepx" attr="2"></span></li><li><span class="twopx" attr="3"></span></li><li><span class="threepx" attr="4"></span></li></ul><div class="shuline"></div><ul class="colorBox"><li class="color-active1"><div class="color-active"></div></li></ul></div>'+
	                '</li>'+   
	                '<li id="line"><div class="iconfont icon-pan"></div>'+
                        '<div class="shezhi"><ul class="lineWidth"><li class="lineWidth-active"><span class="onepx" attr="2"></span></li><li><span class="twopx" attr="3"></span></li><li><span class="threepx" attr="4"></span></li></ul><div class="shuline"></div><ul class="colorBox"><li class="color-active1"><div class="color-active"></div></li></ul></div>'+
	                '</li>'+    
	                '<li id="earser"><div class="iconfont icon-xiangpica"></div></li>'+  
	        '</ul>'+
	        '<ul class="btnbox2"><li id="back"><div class="iconfont icon-fanhui"></div></li><li id="delete"><div class="iconfont icon-shanchu"></div></li></ul>'+  
	    '</div>').appendTo("body");
        $('<div id="svgfather" style="positon:absolute;left:0;top:0;width:100%;height:100%;backgrouond:rgba(255,0,0,0.2);z-index:9">'+  
            '<svg id="svg" width="100%" height="100%" style="bcursor:url(pen.cur),auto;" >  </svg>'+
        '</div> ').appendTo("div[role=main]>div:first");


	    $(".lineWidth>li").click(function(){
	    	$(this).addClass("lineWidth-active").siblings().removeClass("lineWidth-active")
	    })

        var colorArr=["#000000","#808080","#800000","#f7883a","#308430","#385ad3","#800080","#009999","#ffffff","#c0c0c0","#fb3838","#ffff00","#99cc00","#3894e4","#f31bf3","#16dcdc"]
        for(var i=0;i<16;i++){
        	$("<li></li>").css("background",colorArr[i]).appendTo('.colorBox').attr("attr",colorArr[i])
        }
        $(".colorBox>li:not(.color-active1)").click(function(){
        	var index=$(this).index(".colorBox>li:not(.color-active1)");
        	
        	if(index>=16 && index<32){
        		$(this).parent().find("li:first>div").css("background",$(this).attr("attr")).attr("attr",colorArr[index-16])
        	}else if(index>=32 && index<48){
                $(this).parent().find("li:first>div").css("background",$(this).attr("attr")).attr("attr",colorArr[index-32])
        	}else{
        		$(this).parent().find("li:first>div").css("background",$(this).attr("attr")).attr("attr",colorArr[index])
        	}
        	$(this).parents("div.shezhi").find(".lineWidth>li>span").css("background",$(this).attr("attr"))
        })

        var xmlns = "http://www.w3.org/2000/svg";  
        var shape = null;  
        var type = "";  
      
        function evt() {  
            if (window.event) { return window.event; }  
            func = evt.caller;  
            while (func != null) {  
                var arg0 = func.arguments[0];  
                if (arg0) {  
                    if ((arg0.constructor == Event || arg0.constructor == MouseEvent  || arg0.constructor == KeyboardEvent)|| (typeof (arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {  
                        return arg0;  
                    }  
                }  
                func = func.caller;  
            }  
            return null;  
        }  
      
        function pos(o) {  
            var ev = evt();  
            return { x: ev.offsetX, y: ev.offsetY };  
        }  
        var x1;  
        var y1;  
        var arr=[];
        var currentIndex=0;
        var iSpringObj=test.view().playbackController();
        var str=""
        function onClick(o,event) {
            $(".shezhi").hide()  
            var p = pos(o); 
            str=""; 
            switch (type) {  
                case "line": 
                    var w=$(".lineWidth-active").eq(1).find("span").attr("attr") ||2;
                    var c=$(".color-active").eq(1).attr("attr")||"#000";
                    str="m"+p.x+","+p.y;
                    shape = document.createElementNS(xmlns, "path");  
                    shape.setAttribute("d",str);  
                    shape.setAttribute("clicktrue",true);
                    shape.setAttribute("style", "stroke:"+c+";stroke-width:"+w+";fill:none"); 
                    break; 
                case "rect":  
                    var w=$(".lineWidth-active").eq(0).find("span").attr("attr") ||2;
                    var c=$(".color-active").eq(0).attr("attr")||"#000"
                    shape = document.createElementNS(xmlns, "rect");  
                    shape.setAttribute("x", p.x);  
                    shape.setAttribute("y", p.y);  
                    shape.setAttribute("clicktrue",true);                    
                    x1 = p.x;  
                    y1 = p.y;  
                    shape.setAttribute("style", "stroke:"+c+";stroke-width:"+w+";fill:none;");                 
                    break; 
            }  
            if (type != "") {
            	if(type=="earser"){
                    console.log(event.target);
                    var obj=$(event.target)
                    if(obj.attr("clicktrue") == "true"){
                   	    obj.attr("clickhide","true").hide()
                   	    backarr[currentIndex].push(obj);
                    }
            	}else{
            		o.appendChild(shape);  
	            	arr.push(shape);
	            	if(typeof svgarr[currentIndex] =="object"){
	                    svgarr[currentIndex].push(arr);
	                    backarr[currentIndex].push(arr);
	            	}else{
	            		svgarr[currentIndex]=[];
	            	    svgarr[currentIndex].push(arr);
	            	    backarr[currentIndex]=[];
	            	    backarr[currentIndex].push(arr);
	            	}
	            	arr=[];
            	}
            }
        }  
      
        function onMouseMove(o) {  
            if (shape == null) return;  
            var p = pos(o);  
            switch (type) {  
                case "line":  
                    if(p.x<=0){
                        p.x=0
                    }  
                    if(p.y<=0){
                        p.y=0
                    }
                    if(p.x>=($("#svgfather").outerWidth()-5)){
                        p.x=$("#svgfather").outerWidth()-5
                    }
                    if(p.y>=($("#svgfather").outerHeight()-5)){
                        p.y=$("#svgfather").outerHeight()-5
                    } 
                    str+=",L"+p.x+","+p.y;
                    shape.setAttribute("d",str);  
                    break;  
                case "rect":  
                    rx = p.x;  
                    ry = p.y;  
                    shape.setAttribute("width", rx - x1);  
                    shape.setAttribute("height", ry - y1);  
                    break;  
            }  
        }  
      
        function onMouseUp(o) {  
            if (shape == null) return;  
            var p = pos(o);  
            switch (type) {  
                case "line":  
                    str+=",L"+p.x+","+p.y; 
                    shape.setAttribute("d",str);  
                    shape = null;  
                    break;   
                case "rect":  
                    rx = p.x;  
                    ry = p.y;  
                    shape.setAttribute("width", rx - x1);  
                    shape.setAttribute("height", ry - y1);  
                    shape = null;  
                    break;   
            }  
            
        }  
      
        function onShape(t) {  
            type = t;  
        }  
        
        var svgObj=document.getElementById("svg");
        svgObj.onmousedown=function(event){
            onClick(this,event);
            document.onmousemove=function(){
                $("#svgfather").css("z-index",15);
                onMouseMove(svgObj);
            }
            svgObj.onmouseup=function(){
                $("#svgfather").css("z-index",9);
                document.onmousemove=null;
                svgObj.onmouseup=null
                onMouseUp(svgObj);
                setTimeout(function(){
                    var a=new ispring.presenter.presentation.slides.ISlide()
                    console.log(ispring.presenter.presentation.slides.ISlideNotes.prototype.text())
                },800)
                
            }
        }


        //线
        $("#line").click(function(){
        	$("div.iconfont").css("color","#fff")
        	$("#line>div.iconfont").css("color","#fb3838")
            $(".shezhi").hide()
            $(".shezhi").eq(1).show();
        	onShape("line");
        })
        //框
        $("#rect").click(function(){
        	$("div.iconfont").css("color","#fff")
        	$("#rect>div.iconfont").css("color","#fb3838")
            $(".shezhi").hide()
            $(".shezhi").eq(0).show();
        	onShape("rect");
        })
        //橡皮擦
        $("#earser").click(function(){
        	$("div.iconfont").css("color","#fff")
        	$("#earser>div.iconfont").css("color","#fb3838")
            $(".shezhi").hide()
        	onShape("earser")
        })
        //撤销
        $("#back").click(function(){
        	$("div.iconfont").css("color","#fff")
        	$("#back>div.iconfont").css("color","#fb3838")
            $(".shezhi").hide()
            console.log(backarr);
            var outflage=false;
            for(var i in backarr[currentIndex]){
            	if($(backarr[currentIndex][i]).attr("clickhide")){
                    $(backarr[currentIndex][i]).show().removeAttr('clickhide');
                    break;
            	}
            	if(i == (backarr[currentIndex].length-1)){
                    outflage=true;
            	}
            }
            if(outflage){
            	if(backarr[currentIndex].length==1){
	                backarr[currentIndex].splice(0,1);
	                $("#svg").children().remove(":last");
	                svgarr[currentIndex].pop()
	            }else{
	            	for(var i=(backarr[currentIndex].length-1);i>0;i--){
	            		if(i>0){
	            			backarr[currentIndex].splice(i,1);
		            	    $("#svg").children().remove(":last");
		            	    svgarr[currentIndex].pop()
		            	    break;
	            		}
		            	
		            }
	            }
            }            
        })
        //删除
        $("#delete").click(function(){
        	$("div.iconfont").css("color","#fff")
        	$("#delete>div.iconfont").css("color","#fb3838")
            $(".shezhi").hide()
        	$("#svg").empty();
        	arr=[];
        	svgarr[currentIndex]=[];
        })
        // 翻页功能
        $('<div id="hudongBox"><div id="pageBox"><button id="wlh_pre" type="button" class="iconfont icon-zuoyoujiantou-copy-copy-copy"></button><div id="slide-counter"><p id="current-slide"></p></div><button id="wlh_next" type="button" class="iconfont icon-zuoyoujiantou-copy-copy"></button></div><ul id="biaoqing"><li id="veryGood"></li><li id="good"></li><li id="zan"></li></ul></div>').prependTo("body");
        //头部
        $("<div id='headbox' >"+
            "<div id='logobox'><img src='images/logo.png' alt=''><p>青少在线外教</p></div>"+
            "<div id='head-right'><p class='iconfont icon-tubiaozhizuomoban'><span style='display:none' id='lessonName'></span> Page<span id='currentPageNum'></span></p><p  style='display:none' id='clock' class='iconfont icon-shijian'>25:00</p></div>"+
            "</div>").prependTo("body")

        var ispringPresentationConnector = {};
        ispringPresentationConnector.register=function(player){
            var presentation=player.presentation();
            var playbackController=player.view().playbackController();
            var slidesCount=presentation.slides().count();
            initPlaybackControls(playbackController,slidesCount);
            $("#wlh_pre").css("color","rgba(0,0,0,0.5)")

        }(test)

        function initPlaybackControls(playbackController,slidesCount){
            $("#wlh_pre").click(function(){
            	playbackController.gotoPreviousSlide();
            })


            $("#wlh_next").click(function(){
            	playbackController.gotoNextSlide();
            })


            var slideNoLabel=$("#current-slide")
            playbackController.slideChangeEvent().addHandler(function(slideIndex){
                slideNoLabel.html((slideIndex+1).toString()+"/"+slidesCount);
                currentIndex=playbackController.currentSlideIndex();
                if(currentIndex==0){
                    $("#wlh_pre").css("color","rgba(0,0,0,0.5)")
                }else{
                    $("#wlh_pre").css("color","#fff")
                }
                if(currentIndex==(slidesCount-1)){
                    $("#wlh_next").css("color","rgba(0,0,0,0.5)")
                }else{
                    $("#wlh_next").css("color","#fff")
                }

                $(".shezhi").hide();
                if(svgarr[currentIndex]){
                    $("#svg").empty("");
                    for(var i in svgarr[currentIndex]){
                        $(svgarr[currentIndex][i]).appendTo($("#svg"))
                    }
                }else{
                    $("#svg").empty("");

                }
                var num=currentIndex+1
                $("#currentPageNum").html(num);
            	

            	
            })
        }


        //互动区
        var flage=true;
        $("#veryGood").click(function(){        	
        	if(flage){
        		flage=false;
        		$("<div id='veryGoodBox'><img src='images/veryGood.png'></div>").appendTo('div[role=main]>div:first').animate({width:483,height:326,opacity:1},600).delay(1000).animate({width:48,height:32,opacity:0},600,function(){
                    flage=true;
                    $("#veryGoodBox").remove()
                })
        	}
        })
        var flage2=true;
        $("#good").click(function(){        	
        	if(flage2){
        		flage2=false;
        		$("<div id='GoodBox'><img src='images/good.png'></div>").appendTo('div[role=main]>div:first').animate({width:287,height:326,opacity:1},600).delay(100).addClass("goodActive").delay(1000).animate({width:28,height:32,opacity:0},600,function(){
                    flage2=true;
                    $(this).removeClass('goodActive');
                    $("#GoodBox").remove()
                })
        	}
        })
        var imgstr=""
        for(var i=1;i<=15;i++){
            imgstr+='<img id="img'+i+'" src="images/'+i+'.png" alt="">'
        }
        $('<div id="dianzan"><p style="display:none">'+imgstr+
					'</p><canvas id="myCanvas" width="200" height="360" >您的浏览器不支持canvas标签~</canvas></div>').appendTo('#biaoqing>#zan');
        var flage3=true
        $("#zan").click(function(){
            if(flage3){
            	flage3=false;            	
            	$("#dianzan").fadeIn()
				var demo = new JumpBubble({
			        elCanvas : document.getElementById("myCanvas")
			    });
				clearInterval(setDemo1);
			    var setDemo1 = setInterval(function(){
				    var idName = "img" + Math.ceil(Math.random()*15);
				    demo.create({
				      elImg : document.getElementById(idName)
				    });
				},150);
				
				setTimeout(function(){
					demo={}
					demo.create=function(){}
					flage3=true;
					$("#dianzan").delay(1000).fadeOut()
				},2000)
            }
        })

        //倒计时
        /*var minutes=24;
        var seconds=59;
        var t1=setInterval(function(){        
            if(seconds<0){
                seconds=59;            
                if(minutes<=0){
                    location.href="http://www.baidu.com";
                    clearInterval(t1);
                }
                minutes--;
            }
            if(seconds<=9){
                if(minutes<=9){
                    $("#clock").html("0"+minutes+":0"+seconds)
                }else{
                    $("#clock").html(minutes+":0"+seconds)
                }

            }else{
                if(minutes<=9){
                    $("#clock").html("0"+minutes+":"+seconds)
                }else{
                    $("#clock").html(minutes+":"+seconds)
                }
            }
            seconds--;
        },1000)*/

        setTimeout(function(){
            test.view().resize($("div[role=main]>div:first").width()-60,$("div[role=main]>div:first").height()-100)
            $("div[role=main]").css({top:($(document).height()-$("#playerView>div:first").height())/2,right:0,left:0,bottom:0,margin:"auto"})
            $("#headbox").css({
                "width":$("#playerView>div:first").width()+2,
                left:0,
                right:0,
                "margin":"0 auto",
                top:($(document).height()-$("#playerView>div:first").height())/2-40
            })
            $("#hudongBox").css({
                "width":$("#playerView>div:first").width(),
                left:0,
                right:0,
                "margin":"0 auto",
                bottom:($(document).height()-$("#playerView>div:first").height())/2-55
            })
            $("#playerView").css({
                left:0,
                right:0,
                "margin":"0 auto"
            })
            $("#svgbox").css({
                left:($(document).width()-$("#playerView>div:first").width())/2-60,
                top:($(document).height()-$("#playerView>div:first").height())/2
            })
        },100)
        
        
        $(window).resize(function(){
            test.view().resize($("div[role=main]>div:first").width()-60,$("div[role=main]>div:first").height()-100)
            $("div[role=main]").css({top:($(document).height()-$("#playerView>div:first").height())/2})
            $("#headbox").css({
                "width":$("#svgfather").width()+2,
                left:0,
                right:0,
                "margin":"0 auto",
                top:($(document).height()-$("#playerView>div:first").height())/2-40
            })
            $("#hudongBox").css({
                "width":$("#svgfather").width(),
                left:0,
                right:0,
                "margin":"0 auto",
                bottom:($(document).height()-$("#playerView>div:first").height())/2-55
            })
            $("#playerView").css({
                left:0,
                right:0,
                "margin":"0 auto"
            })
            $("#svgbox").css({
                left:($(document).width()-$("#playerView>div:first").width())/2-60,
                top:($(document).height()-$("#playerView>div:first").height())/2
            })
        })


