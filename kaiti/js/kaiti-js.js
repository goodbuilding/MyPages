/**
 * Created by Administrator on 2017/1/3.
 */
window.onload=function(){
    //document.body.style.backgroundColor="yellow";
    //document.body.style.height="3000px";

    setTimeout(function(){animate($("#topAd"),{height:0,width:0});$("#topAd").innerHTML=""},3000);
    //fixSide($("#sideAd"),30);
    beforeBeginSlider();
    setTimeout(beginSlider,3500);
    $("#topAd_close").onclick=function(){animate(this.parentNode.parentNode,{height:0});hide(this);}
    $("#header_close").onclick=function(){animate(this.parentNode,{height:0});hide(this);this.parentNode.innerHTML="";}
    if ($("#header_close").offsetHeight==0){hide($("#header_close"));}
    $("#nav-search").children[0].focus();
    $("#nav-search").children[0].onmouseover=function(){this.select();}
    $("#navQRcode").onmouseover=function(){this.children[1].style.display="block";}
    $("#navQRcode").onmouseout=function(){this.children[1].style.display="none";}
    fixNav("nav");
    goTop($("#gotop"),30);
    //$("#sideNav").style.marginTop=-$("#floorNav").offsetHeight/2+"px";
    //克隆cont
    for (var i=0;i<json.length-1;i++){
        //cont
        var newcont=$("#main").children[0].cloneNode(true);
        $("#main").appendChild(newcont);
        newcont.children[0].onmouseover=function(){animate(this.children[0],{width:0});}
        newcont.children[0].onmouseout=function(){animate(this.children[0],{width:300});}
        newcont.children[1].onmouseover=function(){animate(this.children[1],{height:0});}
        newcont.children[1].onmouseout=function(){animate(this.children[1],{height:300});}
        newcont.children[0].children[1].innerHTML=json[(i+1)].title;
        newcont.children[0].children[2].innerHTML=json[(i+1)].txt;
        newcont.children[1].children[0].src=json[(i+1)].srcul;

        var newbanTablLi=$("#banTab").children[0].cloneNode(true)
        $("#banTab").appendChild(newbanTablLi);
        newbanTablLi.children[0].innerHTML=json[(i+1)].title;
        newbanTablLi.onmouseover=function(){
            newbanTablLi.timer=setTimeout(function(){
                show($("#banTabBox"));
            },300);
            $("#banTabBox").innerHTML=json[i].txt;
        }
        newbanTablLi.onmouseout=function(){hide($("#banTabBox"));clearTimeout(newbanTablLi.timer);}

        var newfloorNavUlLi=$("#floorNavUl").children[0].cloneNode(true);
        $("#floorNavUl").appendChild(newfloorNavUlLi);
        newfloorNavUlLi.children[0].innerHTML=json[(i+1)].index+1;
    }

    var cont_r=$(".cont-r"),cont_l=$(".cont-l"),cont_l_b=$(".cont-l-b"),banTabLis=$("#banTab").children;
    cont_l[0].children[1].innerHTML=json[0].title;
    cont_l[0].children[2].innerHTML=json[0].txt;

    for(var i=0;i<json.length;i++) {
        //$("#floorNavUl").children[i].children[0].innerHTML=json[i].index+1;
        banTabLis[i].index=i;
        var that=this;
        cont_l[i].onmouseover=function(){animate(this.children[0],{width:0});}
        cont_l[i].onmouseout=function(){this.children[0].style.backgroundColor="rgba(0,0,0,.5)";animate(this.children[0],{width:300});}
        //cont_l[i].children[1].innerHTML=json[i].title;
        //cont_l[i].children[2].innerHTML=json[i].txt;
        cont_r[i].onmouseover=function(){animate(this.children[1],{opacity:0});}
        cont_r[i].onmouseout=function(){this.children[1].style.backgroundColor="rgba(0,0,0,.3)";animate(this.children[1],{opacity:50});}
        //cont_r[i].children[0].src="images/"+(i+1)+".jpg"
        //cont_r[i].children[0].src=json[i].srcul;
        cont_r[i].children[1].innerHTML="Section"+(i+1);
        banTabLis[i].children[0].innerHTML=json[i].title;
        banTabLis[i].onmouseover=function(){
            banTabLis.timer=setTimeout(function(){
                show($("#banTabBox"));
            },300);
            $("#banTabBox").innerHTML=json[this.index].txt;
        }
        banTabLis[i].onmouseout=function(){hide($("#banTabBox"));clearTimeout(banTabLis.timer);}
    }
    goFLoor($("#main"),$("#floorNavUl"),20);
}