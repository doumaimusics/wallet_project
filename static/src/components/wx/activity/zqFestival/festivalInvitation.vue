
<!-- 分享出去的注册页 -->
<template>
    <div id="inviteRegister">
        <div v-title>中秋献礼</div>
        <div class="haoyouphone"></div>
        <invite-register :channel="'yaoqing'" :toLink="'/activity/zqFestival'" :inviterId="inviterId" :gouLists="gouList"></invite-register>
    </div>
</template>

<script>
    import getData from '../../../../common/router/getData';		//引入发送请求
    import jiami from 'js-base64';
    import verify from '../../../../common/wx/verification';	//引入表单验证
    import inviteRegister from '../wxNewActivityRegister';	//引入表单验证
    import wxToapp from '../../../../common/wx/wxToapp'; // app交互
    export default{
        mixins:[getData,verify,wxToapp],
        data(){
            return{
                isIOS:false,
                inviterId:'',	//获取邀请人ID
                colors:'#3A8AFF',
                gouList:[
                    'https://aliyunsso.edspay.com/web/wx/activity/myNewInvite/isGou.png',
                    'https://aliyunsso.edspay.com/web/wx/activity/myNewInvite/notGou.png'
                ]
            }
        },

        components:{
            inviteRegister,
        },
        created(){
            this.change();
            this.change();
            if(this.$route.query.ui){
                this.inviterId = Base64.encode(this.$route.query.ui);	//获取邀请人id;
                console.log(this.inviterId)
                // this.inviterId = this.$route.query.ui;	//获取邀请人id;
            }
        },
        mounted() {
            this.PassValue('NavWhite_中秋献礼');
            // 友盟数据统计
            const script = document.createElement('script')
            script.src = 'https://s13.cnzz.com/z_stat.php?id=1274655435&web_id=1274655435'
            script.language = 'JavaScript'
            document.body.appendChild(script)
        },
        watch: { // 监听
            '$route' () {
                if(window._czc) { // 友盟数据统计监听
                    let location = window.location
                    let contentUrl = location.pathname + location.hash
                    let refererUrl = '/'
                    window._czc.push(['_trackPageview', contentUrl, refererUrl])
                }
            }
        }
    }
</script>

<style lang="scss">
    #inviteRegister{
        background: url('https://aliyunsso.edspay.com/web/wx/activity/zqFestival/festivalInvitation.png') no-repeat;
        background-size: 100%;
        height: 36.106667rem;
        .haoyouphone{
            height:5.52rem;
        }
        .from{
            .short{
                span .valicode_img{
                    margin: 0;
                    width: 100%;
                    height: 95%;
                }
                .msgBtn{
                    background: #3A8AFF;
                    color: #fff;
                }

            }
        }
        input{
            font-size:0.4rem;
        }
        .liStyle{
            font-size: 9px!important;
            line-height:16px!important;
        }
        .top{
            height: 3.386667rem;
        }
        .list{
            height:1.066666rem;
            width:7.5rem;
            overflow: hidden;
            margin:0 auto;
            ul{
                position:relative;
                left:0px;
                height: 100%;
                line-height: 1.066666rem;
                li{
                    width:6rem;
                    height: 100%;
                    color:white;
                    text-align: center;
                    line-height: 1.066666rem!important;
                    font-size: 0.346667rem;
                }
            }
        }
    }
</style>