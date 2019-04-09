<template>
    <div id="inviter">
    	<div class="bg">
            <div class="register">
                <register
                   :jumpUrl = "successUrl"
                   :channel="'lbyq01'"
                   :ui = "$route.query.ui">
                </register>
            </div>
            <div class="data">
                <div class="subtitle"><i class="icon"></i>截止目前平台已经安全运营<em>{{statistics.openDays}}天</em></div>
                <ul>
                    <li class="list">
                        <span class="title">累计交易额（元）</span>
                        <span class="account" v-html="$options.filters.changeBillion(statistics.tradeAmount)"></span>
                    </li>
                    <li>
                        <span  class="title">为用户带来收益（元）</span>
                        <span class="account" v-html="$options.filters.changeBillion(statistics.earnAmount)"></span>
                    </li>
                    <li>
                        <span class="title">累计注册人数（人）</span>
                        <span class="account" v-html="$options.filters.changeBillion(statistics.userRegister)"></span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
  import register from './register.vue'  // 注册组件
  export default {
	name: 'inviter',
	data(){
      return {
          successUrl:"/invest",
          statistics:{},    // 统计数据
      }
    },
    methods:{
        initData(){
            let _this = this
            // 统计数据
    		_this.$http.post(_this.ajaxUrl.getUrl(1)+"/index/statistics",{isIndex:0}).then((res) => {
    			if (res.body.resCode == 1) {
    				_this.statistics = res.body.resData.data
    			}
    		})
        }
    },
     mounted:function(){
        this.initData()
    },
    components: {
        'register':register
    },
  }  
</script>

<style lang="scss">
    #inviter{
        width:100%;
        height:2781px;
        background: url(https://aliyunsso.edspay.com/web/myAccount/1118PC.png) no-repeat top center;
        background-size: 1920px 2781px;
        margin:0 auto;
        .bg{
            width:1200px;
            height:auto;
            margin:0 auto;
            position: relative;
            .register{
                width:390px;
                height:350px;
                position: absolute;
                right:0;
                top:25px;
            }
            .data{
                width:1190px;
                height:515px;
                position: absolute;
                left:5px;
                top:2159px;
                padding-top:100px;
                .subtitle{
                    width: 100%;
                    height: 46px;
                    font-size: 32px;
                    text-align: center;
                    line-height:46px;
                    color: #333;
                    i.icon{
                        display: inline-block;
                        width: 46px;
                        height: 46px;
                        background: url(https://aliyunsso.edspay.com/web/activity/register/inviter-apr.png) 50% no-repeat;
                        background-size: 26px 26px;
                        vertical-align: middle;
                    }
                    em{
                        font-size: 32px;
                        font-weight: 500;
                        color: #3dabff;
                    }
                }
                ul{
                    width:100%;
                    height:110px;
                    margin-top:110px;
                    li{
                        float:left;
                        width:33.33%;
                        height:100%;
                        text-align: center;
                       .title{
                            display: block;
                            font-family: PingFangSC-Regular;
                            font-size: 28px;
                            color: #666666; 
                            text-align:center;
                            width:100%;
                            height:38px;
                            margin-bottom:10px;
                        }
                        .account{
                            display: inline;
                            font-family: PingFangSC-Regular;
                            font-size: 44px;
                            color: #FF3E41;
                            text-align:center;
                            span {
                                display: inline;
                            }
                        }  
                    }
                }
            }
        }
    }
</style>