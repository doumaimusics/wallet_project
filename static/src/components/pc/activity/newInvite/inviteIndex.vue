<template>
    <div id="inviteIndex">
        <div class="tips">
            <!-- <div @click="showRule = true" class="li rule"></div>
            <div @click="toInvite" class="li invite"></div> -->
        </div>
        <div v-if="invite_suspend_pc.picUrl" class="floating">
            <router-link :to="{path:invite_suspend_pc.url}">
                <img :src="invite_suspend_pc.picUrl" alt="">
            </router-link>
        </div>
        <div @click="toInvite" class="toInviteBtn"></div>
        <div @click="showRule = false" v-if="showRule" v-layer class="layer">
            <div class="img">
                <div class="time">{{_activetyTime.startTime}}起</div>
                <img src="https://aliyunsso.edspay.com/web/activity/newInvite/ruleText.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    import { MessageBox } from 'element-ui';
    export default{
    	data(){
    		return{
                showRule:false,
                _activetyTime:{},
                invite_suspend_pc:{
                    url:null,
                    picUrl:null
                }
    		}
    	}, 
    	methods:{
            toInvite(){
                if(this.getCookie('token')){
                    this.$router.push({path:'/myAccount/myNewInvatation'});
                }else{
                    this.$router.push({path:'/login'});
                }
            },
            getSuspend(){
                this.notLogPost('/activity/inviteNew/suspend',(data) =>{
                    if(data.resData.invite_suspend_pc){
                        this.invite_suspend_pc = data.resData.invite_suspend_pc;
                    }
                },{})
            },
            getActivityTime(){
                this.notLogPost('/activity/inviteNew/getTime',data => {
                    if(data.resCode){
                        this._activetyTime = data.resData;
                    }
                },{})
            },
    	},
    	created(){
    		this.getActivityTime();
            this.getSuspend();
    	},
        mounted(){
            // 数据统计
            const script = document.createElement('script')
            script.src = 'https://s13.cnzz.com/z_stat.php?id=1275518066&web_id=1275518066'
            script.language = 'JavaScript'
            document.body.appendChild(script);
        }
    }
</script>

<style lang="scss" scoped>
    #inviteIndex{
        background: url('https://aliyunsso.edspay.com/web/myAccount/invatation/newPcInviteBG.png') no-repeat;
        height:1834px;
        width:1200px;
        margin:0 auto;
        position: relative;
        .floating{
            height:100px;
            width:100px;
            position: fixed;
            top:350px;
            left:50%;
            margin-left: 480px;
            img{
                height: 100%;
                width: 100%;
            }
        }
        .toInviteBtn{
            height:100px;
            width:100%;
            position: absolute;
            top:1416px;
            left:0;
        }
        .tips{
            position: absolute;
            right:0;
            top:100px;
            .li{
                height:80px;
                width:78px;
                background-size:100% 100%!important;
            }
            .rule{
                background:url(https://aliyunsso.edspay.com/web/activity/newInvite/myRule.png);
                margin-bottom:17px;
            }
            .invite{
                background:url(https://aliyunsso.edspay.com/web/activity/newInvite/myInvite.png);
            }
        }
        .layer{
            padding-top:120px;
            .img{
                position: relative;
                display:block;
                height:486px;
                width:580px;
                margin:0 auto;
                .time{
                    position: absolute;
                    top:116px;
                    left:142px;
                    line-height: 30px;
                    font-size:13px;
                    color: #666;
                }
                img{
                    height:100%;
                    width:100%;
                }
            }
        }
    }
</style>