module.exports = {
	data() {
		return {
			thisUrl: '',		//获取当前地址
			prevUrl: '', // 上一个地址
			getOne: '',
			login: '',
			thisSearch: '',
			thisHref: '',
			wxLoginUrl: "{path: '/wxLogin',query: { thisUrl: this.thisUrl}}",
			resToken: '',
			token: '',       // 保存token
			userName: '',     // 保存用户名手机号
			fullPath: '',      // 上一个页面的地址带参数的
			query: '',         // 保存当前的地址参数
			path: '',          // 保存当前地址
		}
	},
	methods: {
		checkLogin(sueUrl, defUrl) {	//判断是否已登录
			if (!this.getCookie('userToken')) {
				this.$router.push(defUrl);
			} else {
				this.$router.push(sueUrl);
				this.resToken = this.getCookie('userToken');
			}
		},
		initCookin() {
			this.path = this.$route.path
			this.query = this.$route.query
			this.thisHref = window.location.href;
			var paths = window.location.pathname;
			var sear = window.location.search;
			this.thisSearch = paths + sear;
			if (this.getCookie('token')) {
				this.token = this.getCookie('token')
				this.userName = this.getCookie('userName')
				this.delCookie('userName')
				this.delCookie('token')
				this.setCookie('token', this.token, (1000 * 60 * 20))
				this.setCookie('userName', this.userName, (1000 * 60 * 20))
			}
		},
		prompt() {     // 发送请求的时候验证登录信息是否失效
			var _this = this
			_this.login = false;
			_this.$confirm('对不起！由于长时间未操作，请重新登录', '温馨提示', {
				confirmButtonText: '确定',
				showCancelButton: false,
				type: 'warning'
			}).then(() => {
				_this.$router.push('/login');
				_this.login = false;
			})
			return;
		},
		inspectCookin(val) {
			// val = 1为直接出登录弹框  其他值为提示后出现登录框
			if (!this.getCookie('token')) {
				this.getOne = val;
				val == 1 ? this.$router.push('/login') : this.prompt();
				return;
			}
			this.token = this.getCookie('token')
			this.setCookie('token', this.token, (1000 * 60 * 15))
			this.setCookie('userName', this.userName, (1000 * 60 * 15))
		}
	},
	beforeRouteEnter: (to, from, next) => { //获取当前页面路由
		next(vm => {
			vm.thisUrl = to.path
			vm.prevUrl = from.path
			vm.fullPath = from.fullPath
			// if (vm.getOne == 1) {
			// 	vm.$router.push(from.fullPath)
			// }
		}
		)
	},
	mounted: function () {
		this.initCookin()
	},
	created() {
		this.resToken = this.getCookie('userToken');
	}
}
