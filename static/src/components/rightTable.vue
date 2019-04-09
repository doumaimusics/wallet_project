<template>
  <div id="rightTable">
   <!-- S 右侧小工具 -->
   <ul class="onlineService">

     <!-- 暂停的企点客服 -->
      <!-- <li id="btnClickKefuQq">
        <i class="iconfont">&#xe610;</i>
      </li>
      <li class="wxLink" id="btnClickKefuPc"> -->
        <!-- 计算器 -->
      <li class="wxLink calculate" @click="openCal"></li>
      <li class="wxLink" @click="kefu"></li>
      <li class="wxLink">
        <a href="javascript:void;" class="hover_show"><img width="90" height="90" :src="WXpic"></a>
      </li>
      <li class="wxLink">
        <a href="javascript:void;" class="hover_show"><img width="90" height="90" :src="APPpic"></a>
      </li>
      <li class="backTop" id="backTop" style="display:none;"></li>
      <!-- 计算器组件 -->
     <pc-calculator v-if="isOpen" @closeCal="closeCal" :limit="limitList"></pc-calculator>
    </ul>
    <!-- E 右侧小工具 -->
  </div>
</template>
<script>
 import calculator from './public/calculator'
 export default{
  name:'rightTable',
  data() {
    return {
      logon:false,
      activeIndex: '1',
      WXpic:'',
      APPpic:'',
      isOpen: false,
      limitList: []
    };
  },
  components: {
    'pc-calculator': calculator
  },
  methods:{

    //  客服系统
    kefu:function(){
      // NTKF.im_openInPageChat('kf_9511_1488165613968');//小能客服系统
      qimoChatClick()
    },
    // 打开计算器
    openCal () {
      this.isOpen = !this.isOpen
    },
    // 关闭计算器
    closeCal (val) {
      this.isOpen = val
    },
    // 获取项目期限
    getLimit () {
        global.http._post(this, "/financePlan/getPlanInterestRate", {}, data => {
            if (data.data.resCode == 1) {
                this.limitList = data.data.resData.financePlanModels
            }
        })
    },
    backTop:function() {
      $("#backTop").on("click", function(){  // 点击返回顶部按钮
        var _this = $(this);
        $('html,body').animate({ scrollTop: 0 }, 500 ,function(){
          _this.hide();
        });
      });
      $(window).scroll(function(){  // 右侧小工具适配小屏幕电脑
        var htmlTop = $(document).scrollTop();
        if( htmlTop > 600){
          $("#backTop").show();
        }else{
          $("#backTop").hide();
        }
        if( htmlTop > 300){
          $(".onlineService").css({position: "fixed",top:"400px"})
        }else{
          $(".onlineService").css({position: "absolute",top:"600px"})
        }
      });
    },
    links() { // 下载APP和公众号图片
      let _this = this
      this.$http.post(this.ajaxUrl.getUrl(1) + "/index/links").then((data) => {
        if (data.body.resCode == 1) {
            _this.WXpic = data.body.resData.data.qrCode.weixinUrl
            _this.APPpic = data.body.resData.data.qrCode.appUrl
        } else {

        }
      })
    },
  },
  created () {
    this.getLimit ()
  },
  mounted:function(){
      this.backTop()
      this.links()
    }
}
</script>
<style>
 @import '../style/base.css';
</style>
<style lang="scss" scoped>
    // .onlineService {
    //   position: relative;
    // }
</style>
