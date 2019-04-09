import { MessageBox } from 'mint-ui';
module.exports = {
	data() {
		return {
			osType: '',	//是否在app
			userId: false,	//app是否登录
			vcode: '',	//版本号
			token: '',
			fromTab:'',//白拿商城在app一级页面或者二级页面的跳转
			hasLogin:false,//用户是否登录(app微信兼容)
			_fullHeight: 0, //屏幕高度
		}
	},
	methods: {
		/*
		*接口地址，成功执行的方法，参数，isopen == 1 不展示失败信息
		*/
		getAppData(dataUrl, sucFunction, transmitObj,isOpen, history) {	//活动中需要登录的请求  不需要登录的请求见notLogPost方法 
			this.appPostData(dataUrl, sucFunction, transmitObj, { osType: this.osType, userId: this.userId, oauthToken: this.token }, this.toLogin,this.$route.fullPath,isOpen, history)
		},
		getNotlogData(dataUrl, sucFunction, transmitObj,isExecute){ //有无登录信息均可调用，若存在登录信息默认传给后台 isExecute: 1(显示报错信息)
			if(this.token){
				transmitObj.oauthToken = this.token;
			}
			this.notLogPost(dataUrl, sucFunction, transmitObj, isExecute);
		},
		//弃用
		toWxUrl(toUrl, name, val,name1,value1) {	//页面间跳转
			if(name) this.$route.query[name] = val;
			if(name1) this.$route.query[name1] = value1;
			if (this.osType) {
				this.$router.push({path: toUrl, query: this.$route.query });
			} else {
				if(name) this.$route.query[name] = val;
				this.$router.push({path: toUrl, query: this.$route.query });
			}
		},
		appRouter(toUrl,queryObj,type){ //页面间跳转 ('跳转地址','传参对象','是否使用无痕跳转')
			let parameters;
			if(queryObj){
			   parameters = Object.assign(this.$route.query,queryObj);
			} else {
				parameters = this.$route.query;
			}
			if(type){
				this.$router.replace({path: toUrl, query: parameters });
			}else{
			 	this.$router.push({path: toUrl, query: parameters });
			}
		  },
		toApp(text, url, type, notTrail) {//向app传的值，要跳转的地址，是否需要登录1为需要登录，是否需要无痕跳转(eg:去绑卡页面、需要同时跳转两端页面的跳转)
			if (this.osType) {
				if (type == 1) {
					this.isLogPassValue(text)
				} else {
					this.PassValue(text); 
				}
			} else {
				if (type == 1) {
					if (!this.getCookie('userToken')) {
						this.toWxLogin();
					}else{
						this.$router.push(url);
					}
				} else {
					if (notTrail) this.$router.replace(url);	//路由
					else this.$router.push(url)
				}

			}
		},
		//去登陆  没有弹框提示 直接跳转
		toLogin(){
			this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
		},

		// 去登陆  弹框提示再跳转
		toLoginTip(){
			if(this.osType){
				this.toAppLogin()
			}else{
				this.toWxLogin()
			}
		},
		toAppLogin() {           // 跳转到APP登录页
			this.PassValue('LG');
		},
		toWxLogin(){
			this.$router.replace({ path: '/wxLogin', query: { thisUrl: this.$route.fullPath } });	//路由
			/*MessageBox.confirm('您尚未登录,请登录！').then(action => {
				this.$router.replace({ path: '/wxLogin', query: { thisUrl: this.$route.fullPath } });	//路由
			}, action => { this.$router.go(-1)});*/
		},
		skip(url) {	//需要登录的h5页面跳转
			if (this.osType) {
				if (this.userId) {
					this.$router.push(url);
				} else {
					this.toAppLogin();
				}
			} else {
				if (this.getCookie('userToken')) {
					this.$router.push(url)
				} else {
					this.toWxLogin();
				}
			}
		},
		PassValue(e) {	// 参数'_'隔开，文本'|'隔开 eg:'WIP_'+this.uuid+'|将要跳转到标的详情(弹框文本)|去出借(右边按钮)'
			if (this.osType == "Android") {
				Android.getGoodsInfoFromJs(e);
			} else if (this.osType == "IOS") {
				window.webkit.messageHandlers.passValue.postMessage(e)
			}
		},
		isLogPassValue(e) {    //向app传值（需要登录）
			if (this.userId) {
				this.PassValue(e); 
			} else {
				this.toAppLogin();
			}
		},
		islogin(fun){   // 验证是否登陆
			if (this.osType) {
				if (this.userId) {
					fun()
				}else{
					this.toAppLogin();
				}
			} else {
				if (!this.getCookie('userToken')) {
					this.toWxLogin();
				}else{
					fun()
				}
			}
		},
		getAppUserData(){
			if (this.$route.query.uid) this.userId = this.$route.query.uid;//获取用户id
			else this.userId = '';
			this.vcode = this.$route.query.vcode;//获取app版本号
			this.osType = this.$route.query.mobileType;//iso || android
			
			if (this.$route.query.osType) this.osType = this.$route.query.osType;
			else this.osType = '';
			if (this.$route.query.token) this.token = this.$route.query.token;
			else this.token = '';
			if(this.$route.query.fromTab) this.fromTab = this.$route.query.fromTab
			else this.fromTab = '';

			if(this.userId || this.getCookie('userToken')){
				this.hasLogin = true;
			}
		}
	},
	created() {
		this.getAppUserData();
	},
	mounted(){
		this._fullHeight = document.documentElement.clientHeight;
	}

}