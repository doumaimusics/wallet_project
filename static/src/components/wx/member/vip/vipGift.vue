<template>
	<div id="gift">
		<div v-layer class="layer">
			<div class="content">
				<img :src="tipData.dialogUrl" alt="">
				<div @click="toRed" class="btn"></div>
			</div>
            <div class="text">
                <h4 :style="{color:'#'+tipData.fontColor}">恭喜你</h4>
                {{tipData.dialogMsg}}
            </div>
            <div @click="close" class="close">
                <img src="https://aliyunsso.edspay.com/web/wx/vip/close.png" alt="">
            </div>
		</div>
	</div>
</template>

<script>
    export default{
    	data(){
    		return{

    		}
    	},
    	props:['showtips','tipData'],
    	methods:{
    		toRed(){
    			this.showtips.gift = false;
                if(this.tipData.dialogType == 3){
    			    this.$router.push('/wxMyAccount/wxRedPacket?bankOpenStatus=3&sinaBankCardCount=2');
                }else{
                    this.$router.push('/wxMyAccount/vipWelfare');
                }
    		},
            close(){
                this.showtips.gift = false;
            }
    	},
    	created(){
    		
    	}
    }
</script>

<style lang="scss" scoped>
    #gift{
    	.content{
    		margin:2.693333rem auto 0;
    		position: relative;
			img{
				margin:0 1.253333rem;
				display:inline-block;
				width: 7.493333rem;
				height: 9.706667rem;
			}
			.btn{
				position: absolute;
				bottom: 0;
				left:2.5rem;
				height:1.253333rem;
				width:5.066667rem;
			}
    	}
        .text{
            font-size:0.346667rem;
            line-height: 0.56rem;
            position: absolute;
            top:8.76rem;
            left:1.92rem;
            width:6.133333rem;
            color:#fff;
            text-align:center;
            h4{
                font-size:0.613333rem;
                line-height:0.693333rem;
                padding-bottom:0.186667rem;
            }
        }
        .close{
            padding-top:2rem;
            img{
                height:0.933333rem;
                width:0.933333rem;
                display:block;
                margin:0 auto;
            }
        }
    }
</style>