<template>
    <div class="process-div">
        <div class="process-main">
            <!-- 已完成的部分备案相关合规工作 -->
            <div class="process-img1">
                <!-- 6月 -->
                <span @click="toJump(1)"></span>
                <!-- 8月 -->
                <span @click="toJump(3)"></span>
                <!-- 10月 -->
                <span @click="toJump(2)"></span>
                <!-- 3月 -->
                <!-- <span @click="isShow = true"></span> -->
                <span @click="goBig"></span>
                <!-- 12月 -->
                <span @click="toJump(4)"></span>
            </div>
            <!-- 积极开展合规检查，整改工作井然有序 -->
            <div class="process-img2"></div>
            <!-- 下载pdf按钮 -->
            <div class="process-btn" @click="download"></div>
            <!-- <a class="process-btn" href="https://aliyunsso.edspay.com/images/pdf/1000000138568830.pdf" target="_blank" download></a> -->
        </div>
        <!-- 遮罩 -->                                                                                                                                 
        <div class="pro-mask" v-if="isShow" >
                <img class="pro-pic" src="https://aliyunsso.edspay.com/web/approval/approval3.png"
                 @mousedown='touchStart' @mousemove='touchMove'  @mouseup="touchEnd" :style="slideEffect"
                />
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            isShow:false,
            isStart:false,
            isMove:false,
            startX:0,
            startY:0,
            moveX:0,
            moveY:0,
            endX:0,
            endY:0,
            disX:0,
            disY:0,
            slideEffect:'',
        }
    },
    methods: {
        // 鼠标左键按下
        touchStart(ev) {
            console.log(ev)
            ev = ev || event;
            ev.preventDefault();
            // 鼠标左键点击
            if (ev.button == 0) { 
                this.isStart = true
                console.log(this.disX)
                console.log(this.disX)
                this.startX = ev.clientX; // 记录开始位置
                this.startY = ev.clientY; 
            }
    },
    // 鼠标按下移动
    touchMove(ev) {
        ev = ev || event;
        ev.preventDefault();
        this.isMove = true
        if (this.isStart) {
            console.log(ev.clientX)
            this.moveX = ev.clientX;
            this.moveY= ev.clientY;
            this.disX = this.moveX - this.startX;
            this.disY = this.moveY - this.startY;
            this.slideEffect = 'transform:translate('+this.disX+'px,'+this.disY+'px)';
        }
    },
    // 鼠标抬起
    touchEnd(ev) {
        if (this.isMove) {
            this.slideEffect = 'left:'+(ev.clientX-ev.offsetX)+'px;top:'+(ev.clientY-ev.offsetY)+'px';
        }
        this.isStart = false;
        this.isMove = false
    },
    // 跳转页面
    toJump (val) {
        this.$emit('toJump',val)
    },
    // 新页面放大图片
    goBig () {
            window.open('https://aliyunsso.edspay.com/web/approval/approval3.png')
    },
    // 下载pdf
    download () {
            window.open('https://aliyunsso.edspay.com/images/pdf/1000000138568830.pdf')
        }
    }
}
</script>
<style lang="scss" scoped>
    p {
        text-align: center;
        cursor: pointer;
    }
    .process-div {
        width: 1200px;
        margin: 40px auto 30px auto;
        .process-main {
            width: 1125px;
            height: 2196px;
            margin: 0 auto;
            background: url(https://aliyunsso.edspay.com/web/approval/approval2.png);
            background-size: cover;
            overflow: hidden;
            position: relative;
            .process-btn {
                width: 124px;
                height: 34px;
                position: absolute;
                bottom: 755px;
                right: 17px;
                cursor: pointer;
            }
            .process-img1 {
                position: relative;
                width: 1120px;
                height: 400px;
                margin-top: 270px;
                background: url(https://aliyunsso.edspay.com/web/approval/approval8.png);
                background-size: cover;
                span {
                    position: absolute;
                    width: 59px;
                    height: 20px;
                    cursor: pointer;
                }
                span:nth-of-type(1) {
                    top: 128px;
                    left: 168px;
                }
                span:nth-of-type(2) {
                    top: 128px;
                    left: 531px;
                }
                span:nth-of-type(3) {
                    top: 128px;
                    left: 891px;
                }
                span:nth-of-type(4) {
                    top: 318px;
                    left: 134px;
                    width: 132px;
                }
                span:nth-of-type(5) {
                    top: 328px;
                    left: 886px;
                }
            }
            .process-img2 {
                position: absolute;
                width: 1120px;
                height: 478px;
                background: url(https://aliyunsso.edspay.com/web/approval/approval5.png);
                background-size: cover;
                bottom: 130px;
            }
        }
    }
    .pro-mask {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.5);
        overflow: hidden;
        z-index: 1000;
        .pro-pic {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            z-index: 1002;
            width: 1075px;
            height: 755px;
        }
    }
</style>


