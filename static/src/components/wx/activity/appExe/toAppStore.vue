<template>
   <div id="toAppStore">
       <p>尊敬的E都市钱包用户：</p>
       <p class="indent">受苹果App Store影响，已开发完成的产品功能无法正式上线，严重影响用户体验。为了满足所有用户的出借需求，经平台运营团队研究讨论决定，暂时用<em>新版APP</em>做以替代，具体操作流程如下：</p>
       <p><i></i>在App Store中搜索“<em>E都市钱包</em>”，选择“<em>E都市钱包App-出借享白拿</em>”下载；</p>
       <p><i></i>点击下方“<em>立即更新</em>”按钮，将直接跳转至App Store进行下载安装。</p>
       <p class="indent">新版APP与现有版本均由E都市钱包官方技术团队开发，APP所有权均归E都市钱包官方所有。与现有版本不同的是，新版本已正式上线点对点智能债权匹配系统，所有用户在完成“风险评测”后选择“E计划”项目出借，将由系统自动匹配符合自身风险承受能力的债权，有效降低出借风险，提高出借体验，请各位用户知悉！</p>
       <div class="btn" @click="ToAPPStore">立即更新</div>
   </div>
</template>

<script>
    export default {
        name: 'toAppStore',
        data() {
            return {

            }
        },
        methods: {
            ToAPPStore(){
                window.location.href = "itms-apps://itunes.apple.com/cn/app/id1178531300?mt=8";
            }
        },
        created: function() {

        },
        mounted: function() {
            if(sessionStorage.getItem("appStore") != 1){
                sessionStorage.setItem("appStore",1);
                window.location.href = "itms-apps://itunes.apple.com/cn/app/id1178531300?mt=8";
            }
        },
        components: {

        }
   }
</script>

<style lang="scss" scoped>
    #toAppStore{
        width: 100%;
        padding: 1.333333rem 1rem;
        p{
            font-size: .373333rem;
            color:#666;
            letter-spacing: 1.1px;
            margin-top: .133333rem;
            text-align: justify;
            em{
                color:#FF352E;
            }
            i{
                display: inline-block;
                width: .16rem;
                height: .16rem;
                border-radius: .08rem;
                background: #FF352E;
                margin: 5px;
                vertical-align: middle;
            }
        }
        p.indent{
            text-indent: 2em
        }
        .btn{
            width: 5.2rem;
            height: 1.2rem;
            border-radius: .106667rem;
            color: #fff;
            text-align: center;
            margin: .666667rem auto;
            line-height: 1.2rem;
            font-size: .48rem;
            background-image: linear-gradient(-227deg, #FF654C 0%, #FF352e 100%);
            box-shadow: 0 2px 12px 0 rgba(248, 51, 46, 0.32);
        }
    }
</style>
