<template>
   <div id="info">
        <div class="from" :style="fullHeight">
            <div class="list bdr-b">
                <label>姓名：</label>
                <div class="name" v-if="nameStr">{{name}}</div>
                <input v-model="name" type="text" id="username" placeholder="请输入姓名" v-else>
            </div>
            <div class="list bdr-b">
                <label>手机号：</label>
                <input v-model="mobile" type="number" id="phone" placeholder="请输入手机号码">
            </div>
            <div class="list bdr-b" @click="ifSelectTime = true">
                <label>省、市：</label>
                <div class="city" :class="{acttive: cityName != '请选择'}">{{cityName}}</div>
                <i class="iconfont">&#xe66d;</i>
            </div>
            <div class="textArea">
                <label>自我介绍：</label>
                <textarea class="textBox" placeholder="包括自我履历、出借经历、出借年限、对E都市钱包的看法、对行业的看法等内容!（请输入30字以上）！" v-model="introduction"></textarea>
            </div>
            <div class="pic">
                <label>上传照片：</label>
                <div class="imgBox">
                    <div class="img1">
                        <input type="file" id="upload" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" style="opacity:0;" @change="FileChange">
                        <img v-if="userImg" :src="userImg">
                        <p v-if="userImg">重新上传</p>
                    </div>
                    <div class="img1 bor" v-if="!userImg" @click="layerImg = true">
                        <img :src="userImg?userImg:'https://aliyunsso.edspay.com/web/wx/activity/supervise/examples.png'" alt="">
                        <p class="shili">示例图片</p>
                    </div>
                    <div @click="layerImg = true" class="yulan" v-else>预览图片</div>
                </div>
                <div class="tips">* 尽量上传正式的上半身照片</div>
            </div>
        </div>
        <div class="btnBox" ref="btnBox">
            <div class="btn" @click="submitForm">提交</div>
        </div>
        <mt-popup v-model="ifSelectTime"  position="bottom" :closeOnClickModal="false">
            <div class="complete bdr-b">
                <span class="close comp_btn" @click="close"></span>
            </div>
            <div class="main_wrap">
                <v-distpicker type="mobile" :province="province" :city="city" hide-area @selected="onSelected"></v-distpicker>
            </div>
        </mt-popup>
        <div class="layer" v-layer v-if="layerImg" @click="layerImg = false">
            <img :src="userImg?userImg:'https://aliyunsso.edspay.com/web/wx/activity/supervise/examples.png'" alt="">
            <i class="iconfont">&#xe630;</i>
        </div>
   </div>
</template>

<script>
    import lrz from 'lrz'
    import wxToapp from '../../../../common/wx/wxToapp';   // 与app交互
    import verify from '../../../../common/wx/verification';	//引入表单验证
    import VDistpicker from 'v-distpicker';//省市区组件
    import { Popup, Toast } from 'mint-ui';
    export default {
        mixins: [wxToapp,verify],
        data() {
            return {
                name: '',
                nameStr: false,
                mobile: '',
                cityName: '请选择',
                introduction: '',
                userImg: '',
                ifSelectTime:false,
                province: '',
                city: '',
                fullHeight:{
					minHeight: document.documentElement.clientHeight+"px"  //获取手机可视区域的的高度
                },
                fullHeightBT:{
					top: document.documentElement.clientHeight+"px"  //获取手机可视区域的的高度
                },
                layerImg: false,
                repeat: true,
            }
        },
        methods: {
            getData(){
                let isApply;  // 1:添加  2:修改
                this.$route.query.isApply == 1 ? isApply = 2 : isApply = 1;
                this.getAppData('/activity/candidateUser/getByAddOrUpdate',(res) =>{
                    if(res.resCode){
                        this.name = res.resData.realName;
                        res.resData.isAccount == 1 ? this.nameStr = true : this.nameStr = false;
                        this.mobile = res.resData.mobilePhone;
                        this.cityName = res.resData.province+' '+res.resData.city;
                        this.province = res.resData.province;
                        this.city = res.resData.city;
                        this.userImg = res.resData.photoUrl;
                        this.introduction =res.resData.introduction;
                    }
                },{isUpdateToAdd: isApply})
            },
            FileChange(e){
                var files = e.target.files || e.dataTransfer.files;
				lrz(files[0], { width: 480 }).then((rst) => {
                    this.userImg = rst.base64
				}).always(function() {
				    // 清空文件上传控件的值
				    e.target.value = null;
				});
            },
            //隐藏添加省市区
			close(){
				this.ifSelectTime = false;
			},
			//显示添加省市区
			openPop(){
				this.ifSelectTime = true;
				if(this.addData.province == '台湾省'){
					this.addData.province = '';
				}
            },
            //选择地址
			onSelected(data){
				if(data){
                    this.province = data.province.value;
                    this.city =data.city.value;
                    this.cityName = this.province + ' ' + this.city
				}
				this.ifSelectTime = false;
            },
            // 提交表单
            submitForm(){
                if(!this.repeat){
                    return;
                }
                if(this.name == ''){
                    this.toast({text:'请填写姓名！'});
                    return;
                }
                if(this.isEmpty(this.mobile,'请填写手机号码！',1)) return;
                if(this.isFormat(this.mobile,'请填写正确手机号！','mobileReg',1)) return;
                if(!this.province || !this.city){
                    this.toast({text:'请选择省、市！'});
                    return
                }
                if(!this.introduction){
                     this.toast({text:'请填写自我介绍！'});
                    return
                }
                let delStr = this.introduction.replace(/\s+/g, "");  // 去除所有空格
                if(delStr.length < 30){
                     this.toast({text:'自我介绍请至少填写30个字！'});
                    return
                }
                if(!this.userImg){
                     this.toast({text:'请上传图片！'});
                    return
                }
                this.repeat = false;
                let isApply;  // 1:添加  2:修改
                this.$route.query.isApply == 1 ? isApply = 2 : isApply = 1;
                let period = this.$route.query.period   // 当前第几届活动
                this.getAppData('/activity/candidateUser/submit',(res) =>{
                    if(res.resCode && res.resData.status == 1){
                        this.toast({text: res.resData.popUpWriter});
                        setTimeout(() => {
                            this.repeat = true;
                            this.appRouter('/supervise/enrol')
                        }, 3000);
                    }else{
                        this.repeat = true;
                    }
                },{photoUrl: this.userImg, realName: this.name, province: this.province, city: this.city, introduction: this.introduction, period: period, isUpdateToAdd: isApply, mobilePhone: this.mobile})
            },
            // 放大照片
            enlarge(n){
                this.layerImg = true
            },
        },
        created: function() {
            
        },
        activated(){
            this.getData();
            if(this.$route.query.isApply == 1){
                document.title = '修改报名信息';
                this.PassValue('NavWhite_修改报名信息');
            } else{
                document.title = '我要报名';
                this.PassValue('NavWhite_我要报名');
            } 
        },
        mounted: function() {
            setTimeout(() => {
                this.$refs.btnBox.style.top = document.documentElement.clientHeight+"px"
            }, 50);
        },
        components: {
            VDistpicker
        }
   }
</script>

<style lang="scss" scoped>
    #info{
        .from{
            margin-top: .266667rem;
            background: #fff;
            padding-left: .533333rem;
            padding-bottom: 1.6rem;
            .list{
                position: relative;
                height: 1.333333rem;
                label{
                    line-height: 1.333333rem;
                    width: 1.733333rem;
                    display: inline-block;
                    font-family: PingFangSC-Medium;
                    font-size: .4rem;
                    color: #333;
                }
                .name{
                    display: inline-block;
                    line-height: .8rem;
                    min-width: 5.333333rem;
                    font-family: PingFangSC-Regular;
                    font-size: .4rem;
                    color: #333;
                }
                input::-webkit-input-placeholder {
                    font-family: PingFangSC-Regular;
                    font-size: .4rem;
                    color: #808080;
                    line-height: .8rem;
                }
                input{
                    line-height: .8rem;
                    min-width: 5.333333rem;
                    font-family: PingFangSC-Regular;
                    font-size: .4rem;
                    color: #333;
                }
                .city{
                    font-size: .4rem;
                    color: #808080;
                    line-height: 1;
                    display: inline-block;
                    width: 6.4rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    vertical-align: middle;
                }
                .city.acttive{
                    color: #333;
                }
                i{
                    font-size: .4rem;
                    color: #808080;
                    float: right;
                    margin-right: .533333rem;
                    line-height: 1.333333rem;
                }
            }
            .textArea, .pic{
                label{
                    line-height: 1.333333rem;
                    width: 100%;
                    display: inline-block;
                    font-family: PingFangSC-Medium;
                    font-size: .4rem;
                    color: #333;
                }
            }
            .textBox{
                width: 8.933333rem;
                height: 4.666667rem;
                line-height: .56rem;
                background: #F8F8F8;
                padding: .333333rem;
                font-family: PingFangSC-Regular;
                font-size: .346667rem;
                color: #333333;
                border: none;
            }
            .pic{
                overflow: hidden;
                .imgBox{
                    height: 1.866667rem;
                    .img1{
                        position: relative;
                        width: 1.866667rem;
                        height: 1.866667rem;
                        float: left;
                        margin-right: .533333rem;
                        background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/upload.png)center center;
                        background-size: 1.866667rem 1.866667rem;
                        input{
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            top: 0;
                            left: 0;
                            z-index: 4;
                        }
                        img{
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            top: 0;
                            left: 0;
                            z-index: 2;
                        }
                        p{
                            width: 100%;
                            height: .48rem;
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            z-index: 2; 
                            line-height: 0.48rem;
                            font-family: PingFangSC-Medium;
                            font-size: .32rem;
                            color: #FFFFFF;
                            opacity: 0.7;
                            background: #4A4A4A;
                            text-align: center;
                        }
                        p.shili{
                            background: #ff5228;
                            opacity: 0.4;
                        }
                    }
                    img{
                        width: 1.866667rem;
                        height: 1.866667rem;
                        float: left;
                    }
                    .yulan{
                        font-family: PingFang-SC-Medium;
                        font-size: .32rem;
                        color: #FF6645;
                        float: left;
                        margin-top: 1.413333rem;
                    }
                    .bor{
                        border: .013333rem solid #e5e5e5;
                    }
                }
                .tips{
                    font-family: PingFangSC-Regular;
                    font-size: .266667rem;
                    color: #808080;
                    line-height: .826667rem;
                }
            }
        }
        .btnBox{
            width: 100%;
            height: 1.4rem;
            background: #FFFFFF;
            box-shadow: 0 2px 21px 0 #E8E8E8;
            position: fixed;
            margin-top: -1.4rem;
            left: 0;
            z-index: 10;
            .btn{
                width: 5.333333rem;
                height: 1.013333rem;
                background: #FF6645;
                font-family: PingFang-SC-Bold;
                font-size: .533333rem;
                color: #FFFFFF;
                text-align: center;
                line-height: 1.013333rem;
                border-radius: .506667rem;
                margin:  .2rem auto 0;
            }
        }
        /* popup */
        .complete{
            height: 1.2rem;
            background:#ffffff;
            position: relative;
            padding-left: 0.4rem;
            padding-right: 0.4rem;
            .close{
                display: inline-block;
                width: 0.426667rem;
                height: 0.466667rem;
                background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/addr_close.png) no-repeat;
                background-size: 100%;
                position: relative;
                top: 0.4rem;
            }
            .comp_btn{
                font-family: PingFangSC-Medium;
                font-size: 0.453333rem;
                color: #508CEE;
                display: inline-block;
                float: right;
                line-height: 1.2rem;
            }
        }
        .main_wrap{
            height: 8.3rem;
            overflow: auto;
        }
        .layer{
            img{
                width: 6.533333rem;
                height: 6.933333rem;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
                border-radius: .133333rem;
            }
            i{
                display: block;
                font-size: .666667rem;
                color: #fff;
                position: absolute;
                top: 50%;
                left: 50%;
                margin: auto;
                margin-left: -.333333rem;
                margin-top: 4.066667rem;
            }
        }
    }
</style>

<style lang="scss">
	#info{
        .mint-popup {
            width: 100%;
            height: 9.453333rem;
        }
		.distpicker-address-wrapper .address-header{
			position: absolute;
		    top: 0;
		    left: 0.533333rem;
		    font-size: 0.426667rem;
		    color: #333333;
		}
		.distpicker-address-wrapper .address-header ul li.active{
			font-size: 0.426667rem;
			color: #333333;
			border-bottom: #FF5B4C solid 2px;
		}
		.distpicker-address-wrapper .address-header ul li{
			padding: 0;
		    height: 1.2rem;
		    line-height: 1.2rem;
		    z-index: 99;
		    margin-right: 0.4rem;
			
		}
		.distpicker-address-wrapper .address-container ul li{
			border-bottom: 1px solid #f6f6f6;
			border-top: none;
			font-size: 0.373333rem;
			color: #333333;
			padding: 8px 20px;
        }
	}
</style>
