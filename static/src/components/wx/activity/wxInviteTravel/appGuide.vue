<template>
  <div id="appGuide" :style="fullHeight">
      <img src="https://aliyunsso.edspay.com/web/wx/activity/inviteTravel/APP_yd.png?v=1.1" alt="">
  </div>
</template>

<script>
    export default{
        data(){
            return{
               //  适配iPhoneX 添加的行内样式fullHeight imgBox
				fullHeight:{
					height: document.documentElement.clientHeight+"px"  //获取手机可视区域的的高度
				}
            }
        }
    }
</script>

<style lang="scss" scoped>
   #appGuide{
          width: 100%;
          img{
              width: 100%;
              height: 100%;
          }
   }
</style>

