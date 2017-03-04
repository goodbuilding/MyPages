/**
 * Created by Administrator on 2017/1/3.
 */
window.onload=function(){

}
//封装className
function getclass(classname){
    if (document.getElementsByClassName){
        return document.getElementsByClassName(classname);
    }
    var arr=[];
    var dom=document.getElementsByTagName("*");
    for (var i=0;i<dom.length;i++){
        var txtarr=dom[i].className.split(" ");

        for (var j=0;j<txtarr.length;j++){
            if (txtarr[j]=classname){
                arr.push(dom[i]);
            }
        }
    }
    return arr;
}

//封装$符号
function $(str){
    var s=str.charAt(0);
    var ss=str.substr(1);
    switch (s){
        case "#":return document.getElementById(ss);break;
        case ".":return getclass(ss);break;
        default :return document.getElementsByTagName(str);
    }
}

//封装scroll
function scroll(){
    if (window.pageYOffset!=null){
        return{
            left:window.pageXOffset,
            top:window.pageYOffset
        }
    }
    else if(document.compatMode=="CSS1Compat"){
        return{
            left:document.documentElement.scrollLeft,
            top:document.documentElement.scrollTop
        }
    }
    return{
        left:document.body.scrollLeft,
        top:document.body.scrollTop
    }
}

//封装可视区域的大小
function client(){
    if (window.innerWidth!=null){
        return{
            width:window.innerWidth,
            height:window.innerHeight
        }
    }
    else if (document.compatMode=="CSS1"){
        return{
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight
        }
    }
    else{
        return{
            width:document.body.clientWidth,
            height:document.body.clientHeight
        }
    }
}

//封装运动基本函数
function animate(obj,json,fn){
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var flag=true;
        for (var attr in json){
            var current=0;
            if (attr=="opacity"){
                current = Math.round(parseInt(getStyle(obj,attr)*100)) || 0;
//                    console.log(current);
            }
            else{
                current=parseInt(getStyle(obj,attr));
            }
            var step=(json[attr]-current)/10;
            step=step>0?Math.ceil(step):Math.floor(step);
            if (attr=="opacity"){
                if ("opacity" in obj.style){
                    obj.style.opacity=(current+step)/100;
                }
                else{
                    obj.style.filter = "alpha(opacity ="+(current + step)*10+")";
                }
            }
            else if(attr=="zIndex"){
                obj.style.zIndex=json[attr];

            }
            else{
                obj.style[
                    attr]=current+step+"px";
            }
            if (current!=json[attr]){
                flag=false;
            }
        }
        if (flag){
            clearInterval(obj.timer);
            if (fn){
                fn();
            }
        }
    },30)
}

//封装返回当前元素样式
function getStyle(obj,attr){
    if (obj.currentStyle){
        return obj.currentStyle[attr];
    }
    else {
        return window.getComputedStyle(obj,null)[attr];
    }
}

//多个tab栏切换（闭包节流）
function tab(obj){
    var target = document.getElementById(obj);
    var spans = target.getElementsByTagName("span");
    var lis = target.getElementsByTagName("li");
    for (var i=0;i<spans.length;i++){
        var timer=null;
        spans[i].onmouseover=function(num){
            return function(){
                clearTimeout(timer);
                timer=setTimeout(function(){
                    for (var j=0;j<spans.length;j++){
                        spans[j].className="";
                        lis[j].className="";
                    }
                    spans[num].className="current"

                    ;
                    lis[num].className="show";
                },300)
            }
        }(i);
        spans[i].onmouseout=function(){
            clearTimeout(timer);
        }
    }
}

function show(obj){obj.style.display="block";}
function hide(obj){obj.style.display="none";}

//封装固定nav(参数是nav的id)
function fixNav(navid){
    var navid=document.getElementById(navid);
    var navTop=navid.offsetTop;
    window.onscroll=function(){
        if(scroll().top>=navTop){navid.style.position="fixed";navid.style.top=0;navid.style.zIndex="100"}
        else{navid.style.position="static";}
    }
}

//封装更随广告
function fixSide(obj,interval){
    console.log("fixSide");
    console.log(scroll().top);
    var picTop=obj.offsetTop;
    var leader= 0,target= 0
    obj.timer=null;
    window.onscroll=function(){
        console.log(scroll().top);
        clearInterval(obj.timer);
        target=scroll().top+picTop;
        obj.timer= setInterval(function(){
            var step=(target-leader)/10;
            step=step>0?Math.ceil(step):Math.floor(step);
            leader=leader+step;
            obj.style.top=leader+"px";
        },interval)
    }
}

//楼层导航
function goFloor(nav,target){}

//返回头部
function goTop(obj,interval){
    var leader= 0,target= 0;
    obj.timer=null;
    window.onscroll=function(){
        scroll().top>0?show(obj):hide(obj);
        leader=scroll().top;
    }
    obj.onclick=function(){
        obj.timer=setInterval(function(){
            var step=(target-leader)/10;
            step=step>0?Math.ceil(step):Math.floor(step);
            leader=leader+step;
            window.scrollTo(0,leader);
            if (leader==target){
                clearInterval(obj.timer);
            }
        },interval)
    }
}

//点击返回指定位置
function goFLoor(floor,floornav,interval){
    var ulLis=floor.children;
    var olLis=floornav.children;
    var leader= 0,target= 0, timer=null;
    for (var i=0;i<olLis.length;i++){
        olLis[i].index=i;
        olLis[i].onclick=function(){
            clearInterval(timer);
            target=ulLis[this.index].offsetTop-50;
            timer=setInterval(function(){
                var step=(target-leader)/10;
                step=step>0?Math.ceil(step):Math.floor(step);
                leader=leader+step;
                window.scrollTo(0,leader);
                if (leader==target){
                    clearInterval(timer);
                }
            },interval)
        }
    }
}


