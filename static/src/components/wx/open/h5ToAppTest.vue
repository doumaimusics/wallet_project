<template>
	<div class="uu">
		<div v-title>测试页面</div>
		<div class="btn" @click="downs">测试按钮</div>
		<div id="box"></div>
		<div v-btn @click="returnUuid">获取设备UUID</div>
		<a href="../../../../src/assets/wx/rightArrows.png" download="w3logo">
			<img border="0" src="../../../../src/assets/wx/rightArrows.png" alt="W3School">
		</a>
	</div>
</template>
<script>
	import wxToapp from '../../../common/wx/wxToapp';
	import wxShare from '../../../common/wx/wxShare';
	import { MessageBox } from 'mint-ui';
	export default {
		mixins:[wxToapp, wxShare],
		data(){
			return{
				shareObj: { //分享标题内容配置
                    title: "E起去浪  Happy E 夏!", //标题
                    desc: "天天发红包，付出越多，回报越多，是初恋的味道！", //内容
                    link: global.host + "happySummer/happyInvite", //链接
                    imgUrl: "https://aliyunsso.edspay.com/web/icon.jpg" //图片链接
				},
				options : {
					useEasing: true, 
					useGrouping: true, 
					separator: ',', 
					decimal: '.', 
					response: ''
				}
			}
		},
		methods:{
			toApp(){
				if(this.osType){
					this.isLogPassValue(this.appShare);
				}else{
					this.tips('H5页面点击右上角分享')
				}
				// LUOCAPTCHA.reset();
			},
			CountUp(id, num){
				let demo = new CountUp(id, 0, num, 2, 2.5, this.options)
				if (!demo.error) {
					demo.start();
				} else {
					console.error(demo.error);
				}
			},
			returnUuid(){
				MessageBox('温馨提示', "uuid="+this.fingerprint)
			},
			downloadIamge(imgsrc, name) {//下载图片地址和图片名
				var image = new Image();
				// 解决跨域 Canvas 污染问题
				image.setAttribute("crossOrigin", "anonymous");
				image.onload = function() {
					var canvas = document.createElement("canvas");
					canvas.width = image.width;
					canvas.height = image.height;
					var context = canvas.getContext("2d");
					context.drawImage(image, 0, 0, image.width, image.height);
					var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
				
					var a = document.createElement("a"); // 生成一个a元素
					var event = new MouseEvent("click"); // 创建一个单击事件
					a.download = name || "photo"; // 设置图片名称
					a.href = url; // 将生成的URL设置为a.href属性
					a.dispatchEvent(event); // 触发a的单击事件
				};
				image.src = imgsrc;
			},
			downs(){
				this.downloadIamge('https://aliyunsso.edspay.com/web/icon.jpg', '图片名称')
			}
		},
		mounted () {
			this.CountUp('box', 4068);
			window['getResponse'] = (res) => {
				this.getAnswer(res);
			}
		},
		created(){
			this.getWxShareData(this.shareObj);
			const script = document.createElement('script')
            script.src = 'https://captcha.luosimao.com/static/js/api.js'
            script.language = 'JavaScript'
            document.body.appendChild(script)
		},
		watch: {
			'shareResult' (val){
				if(val){
					this.shareSuccess(val, '70', (data) => {
						this.shareResult = '';
						this.tips(val);
					})
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.uu{
		.responseBox{
			width: 6.666667rem;
			position: absolute;
			top: 3rem;
			left: 1.666667rem;
		}
		.btn{
			width: 3rem;
			height: 3rem;
			text-align: center;
			line-height: 3rem;
			background: #cccccc;
			color: red;
			font-size: .533333rem;
			border-radius: 1.5rem;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			margin: auto;
		}
		a{
			width: 4rem;
			height: 2rem;
			position: absolute;
			top: 3rem;
			left: 3rem;
			img{
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
<style>
	
	#l_captcha_link i{
		display: none !important;
	}
</style>