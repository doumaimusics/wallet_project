<template>
    <div id="authorizedWx">
        <div class="bg">
            <div class="from">
                <div class="phone">{{mobilePhone}}</div>
                <div class="pwd input">
                    <input class="fl" v-model="pwd" type="text" placeholder="请输入8-16位数字与字母组合">
                </div>
                <!-- 协议 -->
                <div class="xieyi">
                    <i class="iconfont" :class="{active:icon}" @click="icon = !icon">&#xe628;</i>
                </div>
                <div @click="goReg" class="btn"></div>
                <router-link to="/wxGetPwd" class="login" tag="div"></router-link>
            </div>
        </div>

    </div>
</template>

<script>
import verify from '../../../../common/wx/verification';	//引入表单验证
export default {
    mixins: [verify],
    data() {
        return {
            icon: true,
            mobilePhone: '',
            pwd: ''
        }
    },
    methods: {
        goReg() {
            if (this.isEmpty(this.pwd, '请输入8-16位数字与字母组合!', 1)) return false;
            if(this.isFormat(this.pwd,'密码格式不正确！','passwordReg',1)) return false;
            if (!this.icon) {
                this.toast({ text: '请点击确认绑定并授权账户相关信息' });
                return;
            }
            this.initAjax()
        },
         initAjax() {
            let _this = this
            _this.$http.post(global.tzjAjaxUrl+"/tzjapi/bindUser", { userName : _this.mobilePhone,password : _this.pwd }).then((res) => {
                if(res.body.resCode == 1){
                    _this.setCookie('userToken', res.body.resData.token, (1000 * 60 * 15))
                    _this.setCookie('zsOpenStatus',res.body.resData.zsOpenStatus)
                    _this.setCookie('userId',res.body.resData.userId)
                    setTimeout(function() { 
                        _this.$router.push("/wxIndex") 
                    }, 1000)
                }else{
                    _this.toast({ text: res.body.resMsg });
                }
			})
        },
        initUserName(){
            let _this = this
            let userId = _this.$route.query.id
            _this.$http.post(global.tzjAjaxUrl+"/tzjapi/getBindUserInfo", { id: userId }).then((res) => {
				_this.mobilePhone = res.body.userName
			})
        }
    },
    created: function() {

    },
    mounted: function() {
        this.initUserName()
    },
    components: {

    }
}
</script>

<style lang="scss" scoped>
@import '../../../../style/iconFont.css';
#authorizedWx {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: 0 auto;
    background: #fff;
    .bg {
        width: 10.0rem;
        height: 16.08rem;
        background: url(https://aliyunsso.edspay.com/web/credibility/authorizedWx.png) center top no-repeat;
        background-size: 100% 100%;
        .from{
            width: 8.133333rem;
            height: 8rem;
            position: absolute;
            top:8.4rem;
            left:50%;
            margin-left: -4.066667rem;
            .phone{
                width: 100%;
                height: 1.2rem;
                padding-left:0.933333rem;
                line-height:1.4rem;
                margin-bottom: 0.506667rem;
                color: #666666;
                font-size:0.386667rem;
            }
            .pwd{
                width: 100%;
                height: 1.2rem;
                padding-left:0.933333rem;
                line-height:1.4rem;
                // margin-bottom: 0.48rem;
               
                input{
                    width: 100%;
                height: 100%;
                 color: #666666;
                font-size:0.386667rem;
                }
            }
             .xieyi {
                margin-top: 0.4rem;
                padding-left:0.133333rem;
                i {

                    font-size: 0.4rem;
                    color: #ccc;
                    margin-bottom: 0.266667rem;
                }
                i.active {
                    color: #fc4147;
                }
            }
            .btn{
                width: 100%;
                height: 1.2rem;
                margin-top: 0.7rem;
            }
            .login{
                width: 20%;
                height: 0.6rem;
                margin: 0 auto;
                margin-top: 0.4rem;
            }
        }
    }
}
</style>
