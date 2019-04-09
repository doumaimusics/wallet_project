<template>
    <div id="assessment">
        <router-link v-if="login" to="/riskAssessment/riskAssessment" class="assessmentBtn" tag="div"></router-link>
        <router-link v-else to="/login" class="assessmentBtn" tag="div"></router-link>
        <div class="contentBox">
            <div class="btns fl">
                <div @click="clickBtn(0)" :class="{'act-btn':activeList[0]}" class="btn btn1 fl">保守型</div>
                <div @click="clickBtn(1)" :class="{'act-btn':activeList[1]}" class="btn btn2 fl">稳健型</div>
                <div @click="clickBtn(2)" :class="{'act-btn':activeList[2]}" class="btn btn3 fl">激进型</div>
            </div>
            <div class="content fl">
                <div class="listBox" :class="{'act-li1':activeList[0],'act-li2':activeList[1],'act-li3':activeList[2]}">
                    <div class="list list1 fl">
                        <img src="https://aliyunsso.edspay.com/web/riskEducation/pcPageRevision/listImg1.png" alt="">
                        <div class="title">保守型</div>
                        <div class="text">您对风险的承受能力较低，不能承受因风险导致的本金或收益损失，在面对较高风险项目时可能会放弃出借。</div>
                        <div class="text tips">温馨提示：您对风险非常敏感，建议您在出借时谨慎选择最适合您的出借项目</div>
                    </div>
                    <div class="list list2 fl">
                        <img src="https://aliyunsso.edspay.com/web/riskEducation/pcPageRevision/listImg2.png" alt="">
                        <div class="title">稳健型</div>
                        <div class="text">您对风险有一定的认知，愿意接受出借过程中可能出现的风险损失，能够理解参考年化收益的小幅波动。</div>
                        <div class="text tips">温馨提示：您对风险较为敏感，建议您在出借过程中合理规划您的资金</div>
                    </div>
                    <div class="list list3 fl">
                        <img src="https://aliyunsso.edspay.com/web/riskEducation/pcPageRevision/listImg3.png" alt="">
                        <div class="title">激进型</div>
                        <div class="text">您具备较高的风险承受能力，愿意接受出借过程中可能出现的较大的风险损失，能够理解参考年化收益的波动。</div>
                        <div class="text tips">温馨提示：您是一位富有冒险精神的出借用户，可以选择任意出借项目进行出借。</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{ 
    	data(){
    		return{
                activeList:[1,0,0],
                login:false,
    		}
    	},
    	methods:{
            clickBtn(index){
                this.$set(this.activeList,0,0);
                this.$set(this.activeList,1,0);
                this.$set(this.activeList,2,0);

                this.$set(this.activeList,index,1);
            },
            init(){
                if (!this.getCookie('token')) {
                    this.login = false;
                } else {
                    this.login = true;
                }
            }
    	},
    	created(){
    		this.init();
    	}
    }
</script>

<style lang="scss" scoped>
    #assessment{

        height: 1686px;
        width:100%;
        overflow-y: hidden;
        background: url('https://aliyunsso.edspay.com/web/riskEducation/pcPageRevision/assessmentInfoBG.jpg') center no-repeat;
        padding-top: 1226px;
        position: relative;
        .assessmentBtn{
            position: absolute;
            top:222px;
            height:56px;
            width:180px;
            left: 50%;
            margin-left: -561px;
        }
        .contentBox{
            width:1200px;
            position: absolute;
            top:1226px;
            left:50%;
            margin-left: -600px;
        }
        .content{
            width: 826px;
            height: 720px;
            overflow: hidden;
            position: relative;
            margin: 0 auto;
            color: #fff;
            font-size: 16px;
            line-height:22px;
            font-family: PingFangSC-Regular;
            .listBox{
                width:2478px;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                .list{
                    height:100%;
                    width: 826px;
                    text-align: center;
                    img{
                        height:160px;
                        width:160px;
                        margin: 0 auto;
                        display: block;
                    }
                    .title{
                        font-size:20px;
                        line-height:28px;
                        padding-bottom: 40px;
                    }
                    .text{
                        padding-top: 20px;
                    }
                }
            }
            .act-li1{
                transition: all 0.4s;
                left: 0;
            }
            .act-li2{
                transition: all 0.4s;
                left: -826px;
            }
            .act-li3{
                transition: all 0.4s;
                left: -1652px;
            }
        }
        .btns{
            width: 280px;
            padding: 0 40px;
            margin: 0 auto;
            font-family: PingFangSC-Medium;
            .btn{
                height: 80px;
                width:200px;
                font-size: 24px;
                line-height: 80px;
                color: #fff;
                background:#0038AE;
                margin-bottom: 40px;
                text-align:center;
            }
            .act-btn{
                background: #00A3DA;
                border: 1px solid #22DECF;
            }
        }
    }
</style>