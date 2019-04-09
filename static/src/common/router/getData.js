//获取图片验证码
module.exports = {
	data() {
		return {
			codeImg: '',
			captchaId: ''
		}
	},
	methods: {
		change(event) {
		var that = this;
		 this.$http.post(that.ajaxUrl.getUrl(1)+'/validimg',{})
      			.then((res) => {   
      				that.codeImg = res.body.resData.validCode;
					that.captchaId = res.body.resData.captchaId;
			    }, (response) => {    
			        // 响应错误回调
			    });    
		/*this.notLogPost('/validimg',(data) =>{
			this.codeImg = data.resData.validCode;
			this.captchaId = data.resData.captchaId;
		},{},1)*/
		/*this.$http.get(this.ajaxUrl.getUrl(1)+'/validimg')
			.then((res) => {
				console.log(res)
				that.codeImg = res.body.resData.validCode;
				that.captchaId = res.body.resData.captchaId;
			}, (response) => {
				// 响应错误回调
			});*/
		},
	}
}
