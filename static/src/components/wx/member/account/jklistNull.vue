<template>
  <div class="cjlist_null" :style="fullHeight">
       <img src="https://aliyunsso.edspay.com/web/wx/account/jkListNull.gif?v=1.2" alt="">
       <p>{{text}}</p>
  </div>
</template>
<script>
    export default{
        data(){
            return{
                 //  适配iPhoneX 添加的行内样式fullHeight imgBox
                fullHeight:{
                    height: document.documentElement.clientHeight+"px"  //获取手机可视区域的的高度
                },
            }
        },
        props:['text']
    }
</script>
<style lang="scss" scoped>
   .cjlist_null{
       width:100%;
       background: #fff;
       text-align: center;
       img{
          width:100%;
          height: 8rem;
          margin-bottom: .293333rem;
       }
       p{
           font-size: .346667rem;
           color: #808080;
       }
   }
</style>

