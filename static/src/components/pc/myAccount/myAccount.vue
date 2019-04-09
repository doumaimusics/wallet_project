<template>
    <div class="flex_box">
        <div class="flex">
            <account-SideBar :myLevel="level" @sigeinfo="sigeinfo"></account-SideBar>
            <router-view class="account-route" @sigeinfo="sigeinfo"></router-view>
        </div>
    </div>
</template>
<script>
    import  sidebar from '../../public/account-sideBar'
    import getUrl from '../../../common/router/getUrl'           // 获取登录信息验证
    export default {
      mixins: [getUrl],
      data () {
        return {
            level: 9
        }
      },
      components : {
        'account-SideBar': sidebar
      },
      methods :{
        sigeinfo(val1,val2){
          this.$emit('sigeinfo',val1,val2)
        },
      },
      mounted () {

      },
    }
</script>
<style scoped>
.flex_box{
  background: #f8f8f8;
  overflow: hidden;
  padding-bottom: 30px;
}
    .flex{
      display:flex;
      width:1200px;
      margin:0 auto;
     /*  box-shadow: 0px 6px 20px 0 rgba(204, 204, 204, 0.26);
      border-left: solid 1px rgba(0, 0, 0, 0.15);
      border-right: solid 1px rgba(0, 0, 0, 0.15); */
      margin-top: 20px;
    }
    .account-route{
       padding:40px 0px 70px 0px;
       width:960px;
       background: #fff;
    }
</style>
