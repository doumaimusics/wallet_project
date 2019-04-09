<template>
   <div id="riskEducation">
       <div v-title>E友学院</div>
       <!-- tab切换 -->
       <div class="tab bdr-b">
           
           <div class="list" v-for="(v, i) in tabList" @click="change(i)" :class="{active: isShowTab[i]}"><span :class="{active: isShowTab[i]}">{{v}}<i></i></span></div>
       </div>
       <div class="tabNo"></div>
       <div class="item">
            <div v-if="vShow">
                <!-- E友课堂 -->
                 <industry-news v-if="isShowTab[0]"></industry-news>
                <!-- 行业新闻 -->
                <e-class  v-if="isShowTab[1]"></e-class>
                <!-- 法律法规 -->
                <laws-regulation v-if="isShowTab[2]"></laws-regulation>
            </div>
            <div v-else>
                <!-- E友课堂 -->
                 <e-class  v-if="isShowTab[0]"></e-class>
                <!-- 行业新闻 -->
                <industry-news v-if="isShowTab[1]"></industry-news>
                <!-- 法律法规 -->
                <laws-regulation v-if="isShowTab[2]"></laws-regulation>
            </div>
       </div>
   </div>
</template>

<script>
    import wxToapp from '../../../common/wx/wxToapp.js';   // 与app交互
    import EClass from './educationChild/EFriendClass'; //E友课堂
    import industryNews from './educationChild/industryNews'; //行业新闻
    import lawsRegulation from './educationChild/lawsAndRegulation'; //法律法规
    export default {
        mixins: [wxToapp],
        data() {
            return {
                tabList: [],
                isShowTab:[true,false,false],
                vShow:'',
            }
        },
        methods: {
            change(index){
                for (var i=0; i < this.tabList.length; i++){
                    this.$set(this.isShowTab, i, false);
                }
                this.$set(this.isShowTab, index, true);
            }
        },
        created: function() {
            this.PassValue('NavWhite_E友学院');
            if(this.osType){
                if(this.versionfunegt(this.vcode,'3.7.4')){
                    this.tabList = ['行业新闻','网贷知识','法律法规']
                    this.vShow = true
                }else{
                    this.tabList = ['网贷知识','行业新闻','法律法规']
                    this.vShow = false
                }
            }else{
                this.tabList = ['网贷知识','行业新闻','法律法规']
                this.vShow = false
            }
            
        },
        components:{
            EClass,
            industryNews,
            lawsRegulation
        },
   }
</script>

<style lang="scss" scoped>
    #riskEducation{
        .tab{
            width: 100%;
            height: 1.066667rem;
            position: fixed;
            z-index: 99;
            background: #fff;
            .list{
                width: 33.33333%;
                height: 100%;
                float: left;
                text-align: center;
                line-height: 1.066667rem;
                span{
                    font-size: .373333rem;
                    color: #7A8898;
                    display: block;
                    margin: 0 auto;
                    width: 1.933333rem;
                    position: relative;

                }
                span.active:after {
                    height: 1px;
                    content: '';
                    width: 100%;
                    border-bottom: 1px solid #FF5B4C;
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    z-index: 3;
                    position: relative;
                }
            }
            .list.active{
                span{
                    color: #4C7DE9;
                    position: relative;
                    i{
                        position: absolute;
                        width: 0.666667rem;
                        height:2px;
                        left:50%;
                        bottom: 1px;
                        margin-left: -0.333333rem;
                        background: #4C7DE9;
                    }
                }
            }
        }
        .tabNo{
            width: 100%;
            height: 1.066667rem;
        }
        .item{

        }
    }
</style>
