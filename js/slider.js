/**
 * Created by Administrator on 2016/12/29.
 */
function beforeBeginSlider(){
    function $(id){return document.getElementById(id);}
    var js_slider=$("js_slider");
    var slider_main_block=$("slider_main_block");
    var imgs=slider_main_block.children;
    var scrollWidth=js_slider.clientWidth;
    for (var i=0;i<imgs.length;i++){
        imgs[i].style.left=scrollWidth+"px";
    }
    imgs[0].style.left=0;
}
function beginSlider(){
    function $(id){return document.getElementById(id);}
    var js_slider=$("js_slider");
    var slider_main_block=$("slider_main_block");
    var slider_ctrl=$("slider_ctrl");
    var imgs=slider_main_block.children;
    var scrollWidth=js_slider.clientWidth;

    for (var i=0;i<imgs.length;i++){
        imgs[i].style.left=scrollWidth+"px";
        //其它人先右移到右边候着
        var span=document.createElement("span");
        span.innerHTML=imgs.length-i;
        span.className="slider-ctrl-con";
        slider_ctrl.insertBefore(span,slider_ctrl.children[1]);
    }
    imgs[0].style.left=0;
    //第一张图片要在原来的位置

    var spans=slider_ctrl.children;
    var iNow=0;
    spans[1].className="slider-ctrl-con current";
    for (var k in spans){
        spans[k].onclick=function(){
            if(this.className=="slider-ctrl-prev"){
                animate(imgs[iNow],{left:scrollWidth});
                --iNow<0?iNow=imgs.length-1:iNow;
                imgs[iNow].style.left=-scrollWidth+"px";
                animate(imgs[iNow],{left:0});
                setSquare();
            }
            else if (this.className=="slider-ctrl-next"){
                autoPlay();
            }
            else{
                var that=this.innerHTML-1;
                if(that>iNow){
                    animate(imgs[iNow],{left:-scrollWidth});
                    imgs[that].style.left=scrollWidth+"px";
                }
                else if(that<iNow){
                    animate(imgs[iNow],{left:scrollWidth});
                    imgs[that].style.left=-scrollWidth+"px";
                }
                iNow=that;
                animate(imgs[iNow],{left:0});
                setSquare();
            }
        }
    }

    var sliderTimer=null;
    sliderTimer=setInterval(autoPlay,3000);
    js_slider.onmouseover=function(){
        clearInterval(sliderTimer);
    }
    js_slider.onmouseout=function(){
        clearInterval(sliderTimer);
        sliderTimer=setInterval(autoPlay,3000);
    }

    function autoPlay(){
        animate(imgs[iNow],{left:-scrollWidth});
        ++iNow>imgs.length-1?iNow=0:iNow;
        imgs[iNow].style.left=scrollWidth+"px";
        animate(imgs[iNow],{left:0});
        setSquare();
    }
    function setSquare(){
        for(var i=1;i<spans.length-1;i++){
            spans[i].className="slider-ctrl-con";
        }
        spans[iNow+1].className="slider-ctrl-con current";
    }
}

