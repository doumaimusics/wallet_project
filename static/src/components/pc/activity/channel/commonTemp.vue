<template>
    <div>
        <!-- 如果是pc端渠道 place为1 -->
        <!-- PC端的渠道推广模板 -->
        <div id="wdzj" ref="pcbackgroundImg" v-if="info.bottomPic && info.place==1">
            <div class="bg" >
                <div class="toLogin">
                    <p class="logins">已有账户，去
                        <router-link :to="{path:'/channels/'+channel+'?pop=LG',query:cnannelData}">登录</router-link>
                    </p>
                </div>
                <div class="register" ref="registeRef">
                    <register :channelData="$route.query" :successUrl="successUrl" :jumpUrl="jumpUrl" :channel="channel">
                    </register>
                </div>
                <p class="rule" @click="flag = true" ref="rule" v-if="info.activityRulePic"></p>
            </div>
            <div class="modal_lg" id="modal_lg1" v-if="flag"></div>
            <!-- 规则 -->
            <div class="mask" v-show="flag">
                <div class="closebtn">
                    活动规则
                    <a @click="flag = false">X</a>
                </div>
                <div class="rules_txt">
                    <div class="rule-img" ref="rulePic"></div>
                </div>

            </div>
        </div>
         <!-- 如果是二合一渠道链接 place为3 -->
        <wxRegister v-if="info.place==3" class="wxMain" ref="commonWx" :wxInfo = "info" :isLoginPC="true"></wxRegister>
    </div>
    
</template>

<script>
import register from '../register.vue'  // 注册组件
import wxregister from '../../../wx/channel/commonTemp'  // wx注册组件
export default {
    data() {
        return {
            successUrl: '',   //成功的地址
            flag: false,
            channel: '',
            info: {},
            channelType: 1,
            jumpUrl: '',
            cnannelData:{},//返利网数据
            buryId:0,
        }
    },
    methods: {
        //借呗的uv统计
        countUv(){
            let isUv = this.channel+"Uv";
            if(this.getNowFormatDate() === localStorage.getItem(isUv)){
                return;
            };
            this.$http.post( this.ajaxUrl.getUrl(6) +'/app/open/channelUser/uv', {mobileType:4,channelCode: this.$route.query.channelCode}, {emulateJSON: false})
            .then((res) => {
                let date = this.getNowFormatDate();
                localStorage.setItem(isUv,date);
            }, (response) => {
                
            });
        },
        // 获取信息
        getInfo () {
            global.http._post(this, "/modules/channelManage/getChannel", {
                channelUrl:this.$route.params.id,
                place: this.channelType				
            }, data => {
                if (data.data.resCode == 1) {
                    if (data.data.resData.data.channel == null || data.data.resData.data.channel.status == 2 || data.data.resData.data.channel.status == 3) {
                        this.$router.push('/404')
                        return
                    }
                    this.info = data.data.resData.data.channel;
                    if(this.info.channelCategory == 1){    // 判断是不是借吧推广页面
                        this.countUv();
					}
                    // 如果为二合一链接
                    if (data.data.resData.data.channel.place ==3) {
                        document.getElementsByTagName('html')[0].style.fontSize = '75px'
                        return
                    };
                    this.getDom()
                    this.checkUrl()
                }
            })
        },
        // 加入友盟
        init(id) {
            const script = document.createElement('script')
            script.src = 'https://s13.cnzz.com/z_stat.php?id=' + id + '&web_id=' + id
            script.language = 'JavaScript'
            document.body.appendChild(script)
        },
        // 判断dom
        getDom () {
            this.$nextTick(function () {
                if (this.info.bottomPic) this.$refs.pcbackgroundImg.style.backgroundImage = "url("+"'"+this.info.bottomPic+"'"+")"
                if (this.info.bottomPicHigh) this.$refs.pcbackgroundImg.style.height = parseInt(this.info.bottomPicHigh)+'px'
                if (this.info.registerFrameHigh) this.$refs.registeRef.style.top = parseInt(this.info.registerFrameHigh) +'px'
                if (this.info.activityRulePic) this.$refs.rule.style.backgroundImage = "url("+"'"+this.info.activityRulePic+"'"+")"
            })
        },
        // 判断注册成功后的跳转地址
        checkUrl () {
            switch (this.info.registerRedirect) {
                case 1:
                    this.successUrl = 'http://android.myapp.com/myapp/detail.htm?apkName=com.rd.chux&ADTAG=mobile'
                    break;
                case 2:
                    this.jumpUrl = '/home'
                    break;
                case 3:
                    this.jumpUrl = '/invest'
                    break;
                case 4:
                    this.jumpUrl = '/home?pop=LG'
                    break;
            }
        },
        // 后台埋点
        // buryPoint (ip) {
        //     this.$http.post('https://buriedpoint.edspay.com/accessRecord/insetAccessRecord', {
        //     	accessType: 1,
        //         channel: this.$route.params.id,
        //         ip:ip,
        //     }).then(function (data) {
        //     	this.buryId = data.data.resData.id
        //     })
        // },
        // // 销毁埋点
        // destroyPoint() {
        //     this.$http.post('https://buriedpoint.edspay.com/accessRecord/updateAccessRecord', {
        //         id: this.buryId,
        //     }).then(function (data) {})
        // }
    },
    created: function() {
        this.getInfo()
        // this.getUserIP((ip)=>{
        //     this.buryPoint(ip)
        // });
        if(this.$route.query.tc){
            this.cnannelData = this.$route.query;
        }
    },
    mounted: function() {
        let imgUrl = window.location.href
        let _channel
        _channel = imgUrl.substring(imgUrl.lastIndexOf("/") + 1);
        this.channel = _channel.split('?')[0]
        this.channel == this.$route.params.id ?  this.init(''+this.info.youmengId+'') :" ";
    },
    destroyed () {
        document.getElementsByTagName('html')[0].style.fontSize = '16px'
        // this.destroyPoint()
    },
    components: {
        'register': register,
        'wxRegister': wxregister
    },
    watch: {
        '$route'() {
            if (window._czc) {
                let location = window.location
                let contentUrl = location.pathname + location.hash
                let refererUrl = '/'
                window._czc.push(['_trackPageview', contentUrl, refererUrl])
            }
        },
        'flag' (val) {
            this.$nextTick(function () {
                this.$refs.rulePic.style.backgroundImage ="url("+"'"+this.info.activityRuleFramePic+"'"+")"
                this.$refs.rulePic.style.height = parseInt(this.info.activityRuleFramePicHigh) + 'px'
            })
        }
    }
}
</script>
<style>
    .mint-msgbox {
        width: 30%;
    }
</style>
<style lang="scss" scoped>
#wdzj {
    width: 100%;
    height: 3037px;
    background: url(https://aliyunsso.edspay.com/channel/cgsxpc.png) no-repeat top center;
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 7;
    .rule {
		background: url('https://aliyunsso.edspay.com/web/channel/flwfix.png') no-repeat;
        background-size: 100%;
		width: 60px;
		height: 140px;
		position: fixed;
		right: calc((100vw - 1200px) / 2 + 10px);
		top:550px;
	}
    .bg {
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        position: relative;
        .toLogin {
            height: 90px;
            position: absolute;
            right: 0;
            top: 0;
            .logins {
                color: #29A2FF;
                font-size: 20px;
                text-align: center;
                text-indent: 949px;
                padding-top: 32px;
                a {
                    color: #29A2FF;
                    padding-bottom: 3px;
                }
            }
        }
        .register {
            width: 390px;
            height: 350px;
            position: absolute;
            right: 0;
            top: 115px;
        }
        .active_rule {
            font-size: 20px;
            color: #2AA2FF;
            position: relative;
            top: 2240px;
            text-align: center;
            text-indent: 1036px;
            cursor: pointer;
        }
    }
    .modal_lg {
        background: black;
        text-align: center;
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.5;
        zoom: 1;
        z-index: 99;
        -moz-opacity: 0.2;
        display: block;
    }
    .mask {
        background: #fff;
        border-radius: 5px;
        position: fixed;
        top: 30%;
        width: 660px;
        left: 32.5%;
        text-align: center;
        z-index: 100;
        display: block;
        .closebtn {
            height: 48px;
            border-bottom: 1px solid #FAAEA4;
            color: #FF6A54;
            line-height: 48px;
            font-size: 14px;
            a {
                float: right;
                padding-right: 21px;
                font-size: 20px;
            }
            a:hover {
                text-decoration: none;
                color: #f75a31;
                cursor: pointer;
            }
        }
        .rules_txt {
            padding: 20px 30px;
            .rule-img {
                width: 600px;
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center center;
            }
            p {
                text-align: justify;
                padding-bottom: 10px;
                font-size: 14px;
            }
        }
    }
}
 /*二合一样式*/
.wxMain {
    width: 750px;
    margin: 0 auto;
    position: relative;
    .buynow-btn {
        width:750px;
    }
}
</style>