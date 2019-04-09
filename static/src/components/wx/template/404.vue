<template>
  <div class="back-mask">
      <div class="back-div"></div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
  .back-mask {
      width:100vw;
      height:100vh;
  }
  .back-div {
      position: absolute;
      top: 0rem;
      left: 0rem;
      right: 0rem;
      bottom: 0rem;
      margin:auto;
      background: url('https://aliyunsso.edspay.com/web/channel/nochannel.png') no-repeat;
      background-size: 100%;
      height: 4.173333rem;
      width: 5.026667rem;
  }
</style>
