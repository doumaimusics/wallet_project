<template>
    <div id="commit">
        <!-- <div class="title">
            <i></i>法人承诺函
        </div> -->
        <div class="img">
        	<img src="https://aliyunsso.edspay.com/web/about/disclosure11.png" alt="">
        </div>	
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
    },
    mounted() {

    }
}
</script>

<style lang="scss" scoped>
#commit {
    padding: 0 44px 80px 23px;
    width: 100%;
    overflow: hidden;
    .title {
      width: 100%;
      height: 34px;
      font-family: PingFangSC;
      line-height: 34px;
      font-size: 24px;
      font-weight: 500;
      text-align: left;
      color: #333333;
      margin-bottom: 40px;
      margin-top: 60px;
      padding-left: 35px;
      i {
        display: inline-block;
        width: 4px;
        height: 24px;
        background: #fc4147;
        margin-top: 4px;
        margin-right: 10px;
        vertical-align: top;
      }
    }
    .img{
    	width: 100%;
    	img{
    		width: 838px;
            height: 648px;
    	}
    }
}
</style>

