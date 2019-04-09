<template>
  <div>
      <el-dialog
        custom-class="feedback-dialog"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        size="tiny"
        @close="closeDialog">
        <h1>意见反馈</h1>
        <p>请把问题交给我们，我们用专业的力量帮您解决。</p>
        <el-form :model="ruleForm"  ref="ruleForm"  class="feedback-form">
            <el-form-item label="反馈类型:">
                <el-select v-model="ruleForm.feebackType" placeholder="请选择反馈类型" style="width:370px">
                <el-option :label="item" :value="item" v-for="item in qCate"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="问题描述:" >
                <el-input type="textarea" v-model="ruleForm.describe" style="width:380px"  :maxlength="500" placeholder="请尽量描述清楚操作页面与流程、设备等信息，将大大提升我们为您跟进的效率（限制500字）。"></el-input>
            </el-form-item>
            <el-form-item label="图片上传:" class="img-item">
                <el-upload
                    ref="upload"
                    :class="{hiddenIcon: picCount==3}"
                    action=""
                    list-type="picture-card"
                    class="feedback-img"
                    :file-list="fileList"
                    multiple
                    :auto-upload="false"
                    :on-change="changeUpload"
                    :on-remove="removeUpload">
                    <i class="el-icon-plus"></i>
                    <span class="el-upload__tip">{{picCount}}/3</span>
                    </el-upload>
                    <!-- 上传超过三张图片显示3/3 -->
                    <span  v-if="picCount==3" class="el-upload__tip all-img">3/3</span>
            </el-form-item>
            <el-form-item label="联系方式:" v-if="!isLogin">
                <el-input  v-model="ruleForm.contact" style="width:380px" placeholder="请留下您的手机号，方便我们的联系"></el-input>
            </el-form-item>
            <el-form-item>
                <!-- 已登录的提交 -->
                <div class="form-btn" v-if="isLogin&&(ruleForm.feebackType&&ruleForm.describe)||isLogin&&(ruleForm.feebackType&&picCount)" 
                @click="submit" v-loading.body="loading">提交</div>
                <!-- 未登录的提交 -->
                <div class="form-btn" 
                v-else-if="ruleForm.feebackType&&ruleForm.describe&&ruleForm.contact||ruleForm.feebackType&&picCount&&ruleForm.contact" 
                @click="submit" v-loading.body="loading">提交</div>
                <!-- 置灰的提交 -->
                <div class="form-btn out" v-else>提交</div>
            </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
    props:{
        ifOpen: Boolean
    },
    data () {
        return{
            dialogVisible: this.ifOpen, //控制弹窗显示
            picCount:0, // 图片张数
            picArr: [], // 最终图片数组
            fileList:[], // 监听上传图片组件数组 控制图片格式
            isLogin:'', // 是否登录
            isGrey:true, // 是否按钮置灰
            loading:false,
            ruleForm:{
                feebackType: '',
                describe:'',
                img:'',
                contact:''
            },
            qCate:[
                "注册问题","开户问题","充值问题","出借问题",
                "账户问题","回款问题","提现问题", "其他",
            ]
        }
    },
    methods: {
        // 关闭弹窗
        closeDialog () {
            this.$emit('closeDialog',false)
        },
        // 移除图片回调
        removeUpload(file, fileList) {
            this.picCount--;
            this.picCount <= 0 ?  this.picCount = 0 :  this.picCount =  this.picCount
            this.picArr.pop()
            this.fileList.pop()
        },
        // 上传change回调
        changeUpload (file, fileList) {
            const isIMG = (file.raw.type == 'image/jpeg' || file.raw.type =='image/png' || file.raw.type =='image/bmp' || file.raw.type =='image/jpg');
            if (!isIMG) {
                this.fileList.push({})
                this.fileList.pop()
                this.$message.error('上传图片只能是图片格式');
                return
            }
            var this_ = this;
            var reader = new FileReader();
            this.picCount++
            if (this.picCount>3) {
                this.picCount = 3
                return                
            } else {
                this.picCount >= 3 ? this.picCount = 3 : this.picCount = this.picCount
            }
            reader.readAsDataURL(file.raw);
            reader.onload = function(e){
                this_.ruleForm.img = e.target.result
                this_.compress (e.target.result,0.2,
                    function(base64Codes) {
                        this_.picArr.push(base64Codes)
                    }
                )
                this_.fileList.push(file)
            }

        },
        // 压缩图片
        compress (path,IMGquality,callback) {
            var img = new Image();
            img.src = path;
            img.onload = function(){
                var that = this;
                // 默认按比例压缩
                var w = that.width,
                    h = that.height,
                    scale = w / h;
                w =w;
                h = w / scale
                var quality = 0.7;  // 默认图片质量为0.7
                //生成canvas
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                // 创建属性节点
                var anw = document.createAttribute("width");
                anw.nodeValue = w;
                var anh = document.createAttribute("height");
                anh.nodeValue = h;
                canvas.setAttributeNode(anw);
                canvas.setAttributeNode(anh);
                ctx.drawImage(that, 0, 0, w, h);
                // quality值越小，所绘制出的图像越模糊
                var base64 = canvas.toDataURL('image/jpeg', quality);
                // 回调函数返回base64的值
                callback(base64)
            }
        },
        // 表单提交
        submit () {
            this.loading = true
            this.ruleForm.img = this.picArr.join('eds_feedback')
            global.http.investPost(this, "/feedback/commit", {
                feedType:this.ruleForm.feebackType,
                image: this.ruleForm.img,
                mobilePhone:this.ruleForm.contact,
                qsRemark:this.ruleForm.describe,
            }, data => {
                if (data.data.resCode == 1) {
                    this.loading = false
                    this.closeDialog()
                    this.$message({ message: data.body.resMsg, type: 'success' });
                } else {
                    this.loading = false
                    this.$message({ message: data.body.resMsg, type: 'error' });
                }
            })
        }
    },
    created () {
        this.getCookie('token')? this.isLogin = this.getCookie('token') : this.isLogin = ''
    }
}
</script>
<style lang="scss">
    .feedback-dialog {
        width: 540px;
        color: #333333;
        text-align: center;
        h1 {
             font-size: 24px;
        }
        p {
            font-size: 14px;
            margin-top: 10px;
        }
        .el-dialog__body {
            padding: 0px 20px ;
        }
        .feedback-form {
            margin-top: 10px;
            padding: 20px;
            .img-item {
                position: relative;
                .all-img {
                    position: absolute;
                    right: 153px;
                    bottom: -5px;
                }
            }
            .form-btn {
                width: 300px;
                height: 50px;
                margin: 10px auto 0px auto;
                text-align: center;
                line-height: 50px;
                border-radius: 4px;
                font-size: 16px;
                letter-spacing: 10px;
                background: #FE3E41;
                 color: #FFFFFF;
                 cursor: pointer;
            }
            .out{
                 background: #FFD8D9;
                 cursor: not-allowed;
            }
            .feedback-img {
                width: 380px;
                height: 60px;
                text-align: left;
                .el-upload--picture-card, .el-upload-list__item {
                    width: 60px;
                    height: 60px;
                }
                .el-upload-list__item-actions {
                    line-height: 55px;
                }
            }
            .el-upload__tip {
                margin-top: 0px;
            }
            // 放大镜icon
            .el-upload-list__item-preview {
                display: none;
            }
            // 打勾的对号icon
            .el-upload-list__item-status-label {
                display: none;
            }
            .el-upload--picture-card {
                position: relative;
                line-height: 64px;
            }
            .el-upload__tip {
                position: absolute;
                right: -40px;
                bottom: -20px;
            }
            // 隐藏加号
            .hiddenIcon {
                .el-upload--picture-card {
                    display: none;
                }
            }
        }
    }
</style>
