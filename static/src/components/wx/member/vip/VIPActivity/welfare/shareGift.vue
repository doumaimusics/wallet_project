<template>
    <div id="shareGift">
        <div v-title>分享有礼</div>
        <div class="shareBtnBox">
            <div @click="toShare(1)" class="shareBtn"></div>
        </div>
        <div class="shareList">
            <ul class="clear">
                <li v-for="(item,index) in 20" class="fl">
                    <div v-if="item <= shareNum" class="hasShare status"></div>
                    <div v-else class="notShare status"></div>
                </li>
            </ul>
            <div class="aprBox">
                <div v-if="shareNum >= 21" class="getApr apr"></div>
                <div v-else class="notApr apr"></div>
            </div>
        </div>
        <div v-if="showShare" @click="showShare = false" v-layer class="shareLayer"></div>
    </div>
</template>

<script>
    import wxShare from '../../../../../../common/wx/wxShare';
    import getActivityData from '../../../../activity/publicJS/getActivityData'; // 获取活动时间
    import inviteSeaman from './inviteSeaman'; // 航海分享
    export default{
        mixins: [wxShare,getActivityData,inviteSeaman],
    	data(){
    		return{
                shareNum:10,
                showShare:false,
    		}
    	},
    	methods:{
            getUserData(){
                this.getAppData('/sail/share/first',(data)=>{
                    if(data.resCode){
                        this.shareNum = data.resData.shareSize;
                    }
                    console.log(data)
                },{})
                
            },
    	},
    	created(){
            this.getUserData();
    		this._getActivityTime('activity_vip_sail');//获取活动id
    	},
        mounted(){
            this.PassValue('NavWhite_分享有礼');

            // 数据统计
            const script = document.createElement('script');
            script.src = 'https://s13.cnzz.com/z_stat.php?id=1275251616&web_id=1275251616';
            script.language = 'JavaScript';
            document.body.appendChild(script);
        }
        
    }
</script>

<style lang="scss" scoped>
    #shareGift{
        height: 21.186667rem;
        background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/shareGiftBG2.png?v1.1') no-repeat;
        background-size: 100% 100%;

        .shareLayer{
            background:rgba(0,0,0,.5) url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/shareLayer.png') top right no-repeat!important;
            background-size:100% 11.48rem!important;
        }
        .shareBtnBox{
            padding: 9.36rem 0 4.386667rem;
            height:15.106667rem;
            .shareBtn{
                height:1.36rem;
                width: 4.0rem;
                margin: 0 auto;
            }
        }
        .shareList{
            padding: 0 0.693333rem;
            position: relative;
            li{
                height:0.933333rem;
                width: 0.933333rem;
                margin-left: 0.346667rem;
                margin-bottom: 0.826667rem;
                .status{
                    width:100%;
                    height: 100%;
                    background-size: 100% 100%!important;
                }
                .hasShare{
                    background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/hasShare.png') no-repeat;
                }
                .notShare{
                    background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/notShare.png') no-repeat;
                }
            }
            li:nth-child(7n+1){
                margin-left: 0;
            }
            .aprBox{
                height:1.6rem;
                width: 1.6rem;
                position: absolute;
                top: 2.826667rem;
                left: 8.106667rem;
                .apr{
                    background-size: 100% 100%!important;
                    height:100%;
                }
                .getApr{
                    background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/getApr.png') no-repeat;
                }
                .notApr{
                    background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/notApr.png') no-repeat;
                }
            }
        }
    }
</style>