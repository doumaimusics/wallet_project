<template>
  <div id="wx"> 
      <router-view></router-view>
  </div>
</template>

<script>
function init(){
    var width = document.documentElement.clientWidth; //获取设备的宽度

    //动态的为根元素设置字体的大小
    document.documentElement.style.fontSize = 32 * (width/320)*0.5 + 'px';
    document.getElementsByTagName('body')[0].style.fontSize= 16 + 'px';

    const ua = navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/.test(ua) || /android/.test(ua)) {
    document.documentElement.style.fontSize = 32 * (width/320) + 'px';
        document.getElementsByTagName('body')[0].style.background= '#f8f8f8';
        //document.getElementsByTagName('body')[0].style.fontFamily= '微软雅黑';
      }
}
init();
window.addEventListener('resize', init)


export default {
  name: 'wx',
  data(){
    return{
    }
  },
  created(){
  },
}

</script>

<style lang="scss">
  @import "./style/iconFont.css";
  @font-face { 
    font-family: 'DIN-Medium'; 
    src: url(./fonts/DIN-Medium.otf); 
  } 
  @font-face { 
    font-family: 'DIN-Bold'; 
    src: url(./fonts/DIN-Bold.otf); 
  } 
   @font-face { 
    font-family: 'DIN-Light'; 
    src: url(./fonts/DIN-Light.otf);
  } 
   @font-face { 
    font-family: 'DIN-Regular'; 
    src: url(./fonts/DIN-Regular.otf); 
  } 

  @font-face {
    font-family: 'Inknut Antiqua';
    font-style: normal;
    font-weight: 400;
    src: local('InknutAntiqua-Regular'),url('./fonts/number.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
  }
  /*声明常用变量*/
  $redColor: #F14B4B !global;

  body,html{
    height: 100%;
  }
  
  body,ol,ul,h1,h2,h3,h4,h5,h6,p,th,td,dl,dd,form,fieldset,legend,input,textarea,select,td,figure{margin:0;padding:0;}
  body{font-family:"微软雅黑","PingFangSC-Regular"; word-wrap:break-word;letter-spacing:0.004933rem}
  a,u,s,del{color:#333;text-decoration:none} 
  fieldset,a img,.bor0,input{border:0;}
  i,em,b{font-style:normal;font-weight:400;}
  li{list-style:none}
  img{vertical-align:middle}
  table{border-collapse:collapse;}
  input,textarea{outline:none;}
  textarea{resize:none;}
  mark{background: none;}

  h1,h2,h3,h4,h5,h6{font-weight: normal;}
  *{
    box-sizing:border-box;
  }

  /*微调*/
  .ic_1{position:relative;top:-1px;}
  .ic_2{position:relative;top:-2px;}
  .ic_3{position:relative;top:-3px;}
  .ic-2{position:relative;top:2px;}

  .ind2{text-indent:2em}
  .clear{zoom:1;}
  .clear:after{content:"";display:block;clear:both;}
  .vcenter{vertical-align:middle;display:inline-block;width:0;height:100%;}
  .over{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .fl{float:left;}
  .fr{float:right;}
  .cu{cursor:pointer;}
  
  .bdr-b:after { height: 1px; content: ''; width: 100%; border-bottom: 1px solid #e5e5e5; position: absolute; bottom: 0; right: 0; transform: scaleY(0.5); -webkit-transform: scaleY(0.5); z-index: 2; }


  .between{display:flex;justify-content:space-between;flex-wrap:wrap;}

  .hidden{
    text-overflow : ellipsis; 
    white-space : nowrap; 
    overflow : hidden; 
  }
  div,a,input{
    -webkit-tap-highlight-color:rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;
    outline:none;
    background: none;
    text-decoration: none;
}

input{
}
::-webkit-input-placeholder { /* WebKit browsers */   //设置input placeholder字体颜色
  color:#d8d8d8;
} 
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
  color:#d8d8d8;
} 
::-moz-placeholder { /* Mozilla Firefox 19+ */ 
  color:#d8d8d8;
} 
:-ms-input-placeholder { /* Internet Explorer 10+ */ 
  color:#d8d8d8;
}

.bdr-b:after {
    height: 1px;
    content: '';
    width: 100%;
    border-bottom: 1px solid #e5e5e5;
    position: absolute;
    bottom: 0;
    right: 0;
    transform: scaleY(0.5);
    -webkit-transform: scaleY(0.5);
    z-index: 2;
}

.bdr-r:after {
    height: 100%;
    content: '';
    width: 1px;
    border-right: 1px solid #e5e5e5;
    position: absolute;
    top: 0;
    right: 0;
    transform: scaleX(0.5);
    -webkit-transform: scaleX(0.5);
    z-index: 10;
}
/* 1PX上边框 */
.bdr-t:before {
    height: 1px;
    content: '';
    width: 100%;
    border-top: 1px solid #e5e5e5;
    position: absolute;
    top: 0;
    right: 0;
    transform: scaleY(0.5);
    -webkit-transform: scaleY(0.5);
    z-index: 10;
}
/* 1PX左边框 */
.bdr-l:before {
    height: 100%;
    content: '';
    width: 1px;
    border-left: 1px solid #e5e5e5;
    position: absolute;
    top: 0;
    left: -1px;
    transform: scaleX(0.5);
    -webkit-transform: scaleX(0.5);
    z-index: 10;
}
.mint-indicator-wrapper{
  z-index: 21;
}
.btns_color_off{
  background: #F9D8D8!important;
}
.btns_color_on{
  background: #F14B4B;
}
// 弹框红色确认按钮
.pop-up-btn{ 
    width:6.666667rem;
    height:0.96rem;
    border-radius:0.58rem;
    line-height:0.96rem;
    text-align:center;
    color:#fff;
    font-size:0.426667rem;
    margin: 0.6rem auto 0;
    background:#F14B4B;
}


</style>
