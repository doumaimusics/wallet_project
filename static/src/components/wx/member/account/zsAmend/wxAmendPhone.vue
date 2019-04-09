<template>
    <div id="amendPhone">
        <ul>
            <li>
                <span>真实姓名</span>
                <p>{{userData.realName}}</p>
            </li>   
            <li>
                <span>银行卡号</span>
                <p>{{userData.bankNo ? userData.bankNo:'' | hideBankNo(1)}}</p>
            </li>
            <li>
                <span>原手机号</span>
                <p>{{userData.mobile ? userData.mobile:'' | phoneNumber}}</p>
            </li>
        </ul>
        <ul>
            <li>
                <span>新手机号</span>
                <input v-model="phone" type="number"  placeholder="请输入新手机号">
                <img v-if="phone" @click="phone = ''" src="https://aliyunsso.edspay.com/web/wx/depository/clear.png" alt="">
            </li>
        </ul>
        <div @click="changePhone" class="btn" :class="{isGray:!phone}" v-btn>确认申请修改</div>
        <pop-message v-if="showMessage.getMessage" :phone="phone" :showMessage="showMessage" :confirm="confirm" :code="code" :logo="'修改手机号'" :again="changePhone"></pop-message>
        <amend-def v-if="showThis.isShow" :cause="cause" :showThis="showThis" :result="result"></amend-def>
    </div>
</template>

<script>
    import wxHeader from '../../../../wxHeader';   //引入头部
    import verify from '../../../../../common/wx/verification';    //引入表单验证
    import wxToapp from '../../../../../common/wx/wxToapp';    //引入表单验证
    import popMessage from '../../invest/popupMessage';
    import amendDef from './wxAmendDef';
    export default{
        mixins:[verify,wxToapp],
    	data(){
    		return{
                phone:'',
                userData:{},
                showMessage:{getMessage:false},
                code:{msgCode:''},
                cause:'',
                showThis:{isShow:false},
                result:'phone',

    		}
    	},
    	methods:{
            getData(){
                this.getAppData('/toChangeMobile',(data) => {
                    if(data.resCode){
                        this.userData = data.resData;
                    }
                },{})
            },
            changePhone(){
                if(!this.phone){
                    return
                }
                if(this.isFormat(this.phone,'手机号格式错误','mobileReg',1)) return
                this.getAppData('/getChangeMobileCode',(data) =>{
                    if(data.resCode){
                        this.showMessage.getMessage = true;
                    }else{
                        this.toast({text:data.resMsg})
                    }
                },{userId:this.getCookie('userId'),newMobile:this.phone},1)
            },
            confirm(){
                this.getAppData('/doChangeMobile',(data) => {
                    this.showMessage.getMessage = false;
                    if(data.resCode){
                        this.appRouter('/wxMyAccount/wxAmendSuccess',{result:'phone',goNum:2,logoMsg:'修改预留手机号'});
                    }else{
                        this.cause = data.resMsg;
                        this.showThis.isShow = true;
                    }
                },{mobile:this.userData.mobile,mobileCode:this.code.msgCode,newMobile:this.phone},1)
            },
            again(){

            }
    	},
        components:{
            wxHeader,
            popMessage,
            amendDef,
        },
    	created(){
    	   this.getData();
    	}
    }
</script>

<style lang="scss" scoped>
    #amendPhone{
        ul{
            margin-top: 0.666667rem;
            padding-left: 0.4rem;
            background:#fff;
            li{
                height: 1.466667rem;
                line-height: 1.413333rem;
                font-size: 0.4rem;
                color: #333;
                border-bottom: 1px solid #e5e5e5;
                position: relative;
                input{font-size:0.4rem;line-height:0.4rem;}
                span{
                    width:2.08rem;
                    font-size:0.346667rem;
                    line-height:1.466667rem;
                    float: left;
                }
                p{
                    float:left;
                }
                em{
                    float:right;
                    padding-right:0.346667rem;
                    color:#808080;
                    font-size:0.346667rem;
                    width:68%;
                    text-align:right;
                }
                i{
                    height:0.4rem;
                    width:0.266667rem;
                    float:right;
                    margin-right:0.4rem;
                    margin-top: 0.51rem;
                    background:url(https://aliyunsso.edspay.com/web/wx/depository/right.png);
                    background-size:100% 100%;
                }
                img{
                    float:right;
                    margin: 0.533333rem 0.4rem 0 0;
                    height:0.4rem;
                    width:0.4rem;
                }
            }
            li:last-child{
                border:0;
            }
        }
        .btn{
            margin:0.8rem auto 0!important;
        }
        .isGray{background: #E4E4E4!important;}
    }
    
</style>