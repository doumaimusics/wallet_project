<template>
    <div id="amend-card">
        <ul>
            <li>
                <span>真实姓名</span>
                <p>{{userData.realName}}</p>
            </li>   
            <li>
                <span>身份证号</span>
                <p>{{userData.cardId ? userData.cardId:'' | hideBankNo(2)}}</p>
            </li>
            <li>
                <span>原银行卡号</span>
                <p>{{userData.oldBankNo ? userData.oldBankNo:'' | hideBankNo(1)}}</p>
            </li>
            <li>
                <span>原手机号</span>
                <p>{{userData.phone ? userData.phone:'' | phoneNumber}}</p>
            </li>
        </ul>
        <ul>
            <li>
                <span>银行卡号</span>
                <input v-model="cardId" type="number"  placeholder="请输入您本人银行卡号">
                <img v-if="cardId" @click="cardId = ''" src="https://aliyunsso.edspay.com/web/wx/depository/clear.png" alt="">
            </li>
            <li  @click="appRouter('/wxMyAccount/wxAmendCard/wxAddBank',{entrance:'zsAmendCard',dataUrl:'/account/zsbank/list'},1)">
                <span>开户银行</span>
                <i></i>
                <em class="hidden">{{bankName}}</em>
            </li>
            <li @click="appRouter('/wxMyAccount/wxAmendCard/wxGetCity',{entrance:'zsAmendCard',province:province,cityName:cityName},1)">
                <span>开户城市</span>
                <i></i>
                <em class="hidden">{{cityName}}</em>
            </li>
            <li @click="goSubbranch">
                <span>开户支行</span>
                <i></i>
                <em class="hidden">{{subbranch}}</em>
            </li>
        </ul>
        <div @click="changeCard" :class="{gray:!getAll}" class="btn" v-btn>确认申请修改</div>
        <pop-message v-if="showMessage.getMessage" :phone="userData.phone" :showMessage="showMessage" :confirm="confirm" :code="code" :logo="'银行卡验证码'" :again="changeCard"></pop-message>
        <amend-def v-if="showThis.isShow" :cause="cause" :showThis="showThis" :result="result"></amend-def>
    </div>
</template>

<script>
    import wxHeader from '../../../../wxHeader';   //引入头部
    import verify from '../../../../../common/wx/verification';    //引入表单验证
    import wxToapp from '../../../../../common/wx/wxToapp';    //引入表单验证
    import wxToast from '../../../../../common/wx/wxToast'; //引入toast提示
    import popMessage from '../../invest/popupMessage';
    import amendDef from './wxAmendDef';
    export default{
        mixins:[verify,wxToast,wxToapp],
        data(){
            return{
                userData:{},
                bankName:'请选择开户银行',
                bankCode:'',
                cityName:'请选择开户城市',
                province:'',
                gbAreaId:'',
                subbranch:'请选择开户支行',
                unionLineNo:'',
                showThis:{isShow:false},
                cause:'',
                result:'card',
                showMessage:{getMessage:false},
                phone:'',
                code:{msgCode:''},

                cardId:'',
            }
        },
        computed:{
            getAll(){
                if(this.cardId && this.bankName != '请选择开户银行' && this.cityName != '请选择开户城市' && this.subbranch != '请选择开户支行'){
                    return true;
                }else{
                    return false;
                }
            },
        },
        methods:{
            // goMsg(goUrl){
                // this.$router.replace(goUrl);
            // },
            goSubbranch(){
                if(this.bankName == '请选择开户银行'){
                    this.toast({text:'请先选择开户银行'});
                    return;
                }
                if(this.cityName == '请选择开户城市'){
                    this.toast({text:'请先选择开户城市'})
                    return;
                }
                this.appRouter('/wxMyAccount/wxAmendCard/wxSearch',{entrance:'zsAmendCard',bankCode:this.bankCode,gbAreaId:this.gbAreaId},1)
            },
            changeCard(){
                if(!this.getAll){return}
                if(this.isFormat(this.cardId,'银行卡号格式错误！','cardnoReg',1)){return};
                this.getAppData('/getChangeAccCode',(data)=>{
                    if(data.resCode){
                        this.showMessage.getMessage = true;
                    }else{

                    }
                },{newBankNo:this.cardId})
            },
            confirm(){
                this.getAppData('/doChangeAccCode',(data)=>{
                    if(data.resCode){
                        if(data.resData.result == 1){//成功
                            this.appRouter('/wxMyAccount/wxAmendSuccess',{result:'card',goNum:3,logoMsg:'修改存管银行卡'});
                        }else if(data.resData.result == 2){//失败
                            this.cause = data.resData.msg;
                            this.showThis.isShow = true;
                        }else if(data.resData.result == 0){//线下审核
                            this.appRouter('/wxMyAccount/wxAmendCheck',{bankNo:this.cardId,result:'card',goNum:3,logoMsg:'修改存管银行卡'});
                        }
                        /*if(data.resCode.result){
                            
                        }*/
                    }

                },{authCode:this.code.msgCode,bankCode:this.bankCode,bankName:this.bankName,branch:this.subbranch,branchNo:this.unionLineNo,city:this.cityName,province:this.province,newBankNo:this.cardId,oldBankNo:this.userData.oldBankNo,userId:this.getCookie('userId') ? this.getCookie('userId'):this.userId})
            },
            getCardData(){
                this.getAppData('/getBankInfo',(data)=>{
                    if(data.resCode){
                        this.userData = data.resData;
                        this.userData.realName = '*' + this.userData.realName.substring(1);
                    }
                },{})
            }

        },
        components:{
            wxHeader,
            popMessage,
            amendDef,
        },
        created(){
            this.getCardData();

            this.$route.query.bankName =''
            this.$route.query.bankCode =''

            this.$route.query.cityName =''
            this.$route.query.province =''

            this.$route.query.subbranch =''
            this.$route.query.unionLineNo =''
        },
        activated(){
            if(this.$route.query.bankName) this.bankName=this.$route.query.bankName;    //银行名
            if(this.$route.query.bankCode) this.bankCode=this.$route.query.bankCode;    //银行ID

            if(this.$route.query.province) this.province=this.$route.query.province;    //省份
            if(this.$route.query.cityName) this.cityName=this.$route.query.cityName;    //城市名
            if(this.$route.query.gbAreaId) this.gbAreaId=this.$route.query.gbAreaId;    //城市编号

            if(this.$route.query.subbranch) this.subbranch=this.$route.query.subbranch; //支行
            if(this.$route.query.unionLineNo) this.unionLineNo=this.$route.query.unionLineNo;   //支行
        },
        
    }
</script>

<style lang="scss" scoped>
    #amend-card{
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
                span{
                    width:2.08rem;
                    font-size:0.346667rem;
                    line-height:1.466667rem;
                    float: left;
                }
                input{
                    font-size: 0.373333rem;
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
            margin:0.8rem auto!important;
        }
        .gray{
            background: #E4E4E4!important;
        }
    }
</style>